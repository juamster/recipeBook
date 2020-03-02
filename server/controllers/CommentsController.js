import express from "express";
import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentsService";


export class CommentsController extends BaseController {
  constructor() {
    super("api/comments/");
    this.router = express
      .Router()
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getAll)
      .get("/:recipeId", this.getByRecipeId)
      .get("")
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let data = await commentService.get(req.query);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getByRecipeId(req, res, next) {
    try {
      let data = await commentService.get({ "recipeId": req.params.recipeId });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {

      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.sub;
      let newComment = await commentService.create(req.body);
      res.send(newComment);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let editedData = await commentService.update(req.query, req.body)
      return res.send(editedData)
    } catch (error) {
      next(error)
    }
  }


  async delete(req, res, next) {
    try {
      await commentService.delete(req.params.id);
      res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }
}