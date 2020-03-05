import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import mongoose from "mongoose";
import Recipe from "../models/Recipe"


class RecipesService {
  async create(recipeData) {
    return await dbContext.Recipes.create(recipeData);
  }
  async get(query = {}) {
    //NOTE:  I changed the Server to only ask for deleted=false
    let recipes = await dbContext.Recipes.find({ ...query, 'deleted': false });

    return recipes;
  }
  async update(id, updateData) {
    // do some business logic
    let aRecipe = await this.getById(id);
    // @ts-ignore
    if (!aRecipe.deleted) {
      return await dbContext.Recipes.findByIdAndUpdate(id, updateData, { new: true });
    }
  }

  async getById(id) {
    let recipe = await dbContext.Recipes.findById(id);
    if (!recipe) {
      throw new BadRequest("Invalid Id");
    }
    return recipe;
  }

  async delete(id) {
    let aRecipe = await this.getById(id);
    // @ts-ignore
    if (!aRecipe.deleted) {
      // @ts-ignore
      aRecipe.deleted = true;
      return await dbContext.Recipes.findByIdAndUpdate(id, aRecipe, { new: true });
    } else {
      throw new BadRequest("This recipe is already deleted");
    }

  }
}

export const recipeService = new RecipesService();