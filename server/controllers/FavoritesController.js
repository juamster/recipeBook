import express from "express";
import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider"
import { favoriteService } from "../services/FavoritesService";

export class FavoritesController extends BaseController {
  constructor() {
    super("api/favorites/");
    this.router = express
      .Router()
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);

  }

  async getAll(req, res, next) {
    try {
      let data = await favoriteService.get(req.query);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let editedData = await favoriteService.update(req.query, req.body)
      return res.send(editedData)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {

      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.sub;
      let newFavorite = await favoriteService.create(req.body);
      res.send(newFavorite);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await favoriteService.delete(req.params.id);
      res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }
}