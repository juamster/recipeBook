import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import RecipeSchema from "../models/Recipe"
import FavoriteSchema from "../models/Favorite"
import CommentSchema from "../models/Comment"

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Recipes = mongoose.model("Recipe", RecipeSchema);
  Favorites = mongoose.model("Favorite", FavoriteSchema);
  Comments = mongoose.model("Comment", CommentSchema);

}

export const dbContext = new DbContext();
