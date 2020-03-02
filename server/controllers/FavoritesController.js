import express from "express";
import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider"
import { favoriteService } from "../services/FavoritesService";

export class FavoritesController extends BaseController {
  constructor() {
    super("api/favorites/");
    this.router = express
      .Router()
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getAll)
      .get("/:userId", this.getByUserId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }
  /* 
   * This will get all in the database that are not deleted
   */
  async getAll(req, res, next) {
    try {
      // let data = await favoriteService.get({ "deleted": false });
      let data = await favoriteService.get(req.query);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  /*
     * This will get all in the database for the current user
     */
  async getByUserId(req, res, next) {
    try {
      let data = await favoriteService.get({ "userId": req.query.userId });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  /* 
   * Creates a new favorite for the current user
   */
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.userId = req.userInfo.sub;
      let newFavorite = await favoriteService.create(req.body);
      res.send(newFavorite);
    } catch (error) {
      next(error);
    }
  }

  /*
   * This would happen if a user un-favorites something, but will
   *  allow all data to change.
   */
  async edit(req, res, next) {
    try {
      let editedData = await favoriteService.update(req.params.id, req.body)
      return res.send(editedData)
    } catch (error) {
      next(error)
    }
  }

  /*  
   * Soft delete a particular favorite
   */
  async delete(req, res, next) {
    try {
      await favoriteService.delete(req.params.id);
      res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }
}