import { Comments } from "../Models/Comments.js";
import STORE from "../store.js";
import { resource } from "../resource.js"
import { Recipe } from "../models/Recipe.js";

// The services job is to control data access
class CommentsService {

  async create(commentData) {

    console.log("In Create ... going to database with: ", commentData)
    let data = await resource.post("/api/comments/", commentData);
    let comment = new Comments(data);
    STORE.State.commentsList[comment.recipeId] = STORE.State.commentsList[comment.recipeId] || [];
    STORE.State.commentsList[comment.recipeId].push(comment);
    STORE.commit("commentsList", STORE.State.commentsList);
  }

  async getComments() {

    let data = await resource.get("api/comments");
    console.log("**** In getComments- these are the comments from the Database: ", data);
    let commentsList = {}
    data.forEach(comment => {
      commentsList[comment.recipeId] = commentsList[comment.recipeId] || []
      commentsList[comment.recipeId].push(comment)
    });

    STORE.commit("commentsList", commentsList);
    console.log("**** In getComments - STORE.state.commentsList ", STORE.State.commentsList);
  }

  /*  Let's not worry about deleting now */

  // async deleteComment(comment) {
  //   let data = await resource.delete("/api/comments/" + comment.id);
  //   delete STORE.State.favorites[comment.recipeId]
  //   // console.log("**** in deleteComments: this is what's in comments", STORE.State.Comments)

  //   STORE.commit("comments", STORE.State.comments);
  // }

  findCommentsByRecipeId(recipeId) {
    let recipeComments = [];

    STORE.State.commentList[recipeId]
      .forEach(c => recipeComments.push(c.content))
    console.log("these are the comments");
    return recipeComments;
  }

}

export const commentsService = new CommentsService();