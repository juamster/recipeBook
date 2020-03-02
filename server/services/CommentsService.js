import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import mongoose from "mongoose";
import Comment from "../models/Comment"

class CommentsService {
  async create(CommentData) {
    return await dbContext.Comments.create(CommentData);
  }
  async get(query = {}) {
    //TODO: check for deleted
    let Comments = await dbContext.Comments.find({ ...query, 'deleted': false });
    return Comments;

  }

  async getByRecipeId(recipeId) {
    let comment = await dbContext.Comments.find({ 'recipeId': recipeId });
    if (!comment) {
      throw new BadRequest("Invalid Id");
    }
    return comment;
  }
  async update(id, updateData) {
    // do some business logic
    let aComment = await this.getById(id);
    // @ts-ignore
    if (!aComment.deleted) {
      return await dbContext.Comments.findByIdAndUpdate(id, updateData, { new: true });
    }
  }

  async getById(id) {
    let Comment = await dbContext.Comments.findById(id);
    if (!Comment) {
      throw new BadRequest("Invalid Id");
    }
    return Comment;
  }

  async delete(id) {
    let data = await this.getById(id);
    // @ts-ignore
    if (!data.deleted) {
      // @ts-ignore
      data.deleted = true;
      return await dbContext.Comments.findByIdAndUpdate(id, data, { new: true });
    } else {
      throw new BadRequest("This Comment is already deleted ");
    }

  }
}
export const commentService = new CommentsService();