import express from "express";
import BaseController from "../utils/BaseController";
import { valuesService } from "../services/ValuesService";
import Auth0Provider from "@bcwdev/auth0provider"
import { recipeService } from "../services/RecipesService";
import { commentService } from "../services/CommentsService";

export class RecipesController extends BaseController {
  constructor() {
    super("api/recipes");
    this.router = express
      .Router()
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get("/:id/comments", this.getAllCommentsByRecipeId)
      .get("/:id", this.getByRecipeId)
      .post("", this.create)
      .put("/:id", this.editRecipe)
      .delete("/:id", this.delete);

  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.sub;
      req.body.creatorName = req.userInfo.nickname;
      req.body.creatorPicture = req.userInfo.picture;
      let newRecipe = await recipeService.create(req.body);
      res.send(newRecipe);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      console.log("req.query is", req.query);
      let data = await recipeService.get(req.query);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  // NOTE:  I was doing something with comments, but don't remember 
  // async getAllCommentsByRecipeId(req, res, next) {
  //   try {
  //     let comments = await commentService.getByRecipeId(req.params.id);
  //     res.send(comments);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async getByRecipeId(req, res, next) {
    try {
      let comments = await recipeService.getById(req.params.id);
      res.send(comments);
    } catch (e) {
      next(e);
    }
  }
  async editRecipe(req, res, next) {
    try {
      let editedRecipe = await recipeService.update(req.params.id, req.body)
      return res.send(editedRecipe)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await recipeService.delete(req.params.id);
      res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }
}
