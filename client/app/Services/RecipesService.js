import { Recipe } from "../models/Recipe.js";
import STORE from "../store.js";
import { resource } from "../resource.js"

// The services job is to control data access
class RecipesService {
  // setActiveRecipe(recipeId) {
  //   let aRecipe = STORE.State.recipes.find(r => r.id == recipeId);
  //   if (!aRecipe) {
  //     throw new Error("Invalid Id");
  //   }
  //   // TODO check project members
  //   STORE.State.activeRecipe = aRecipe;
  // }

  async getRecipeById(recipeId) {
    let data = await resource.get("/api/recipes/" + recipeId);
    let aRecipe = data.map(r => new Recipe(r));
    if (!aRecipe) {
      throw new Error("Invalid Id");
    }
    return aRecipe;
  }
  async createRecipe(recipeData) {

    let data = await resource.post("/api/recipes/", recipeData);
    let recipe = new Recipe(data);
    STORE.State.recipes.push(recipe);
    STORE.commit("recipes", STORE.State.recipes);
  }

  async deleteRecipe(recipeId) {

    let data = await resource.delete("/api/recipes/" + recipeId);

    let i = STORE.State.recipes.findIndex(r => r.recipeId == recipeId);

    if (i != -1) {
      STORE.State.recipes.splice(i, 1);
      STORE.commit("recipes", STORE.State.recipes);

    }
  }


  async favRecipe(recipeId) {

  }

  async updateRecipe(recipeData) {
    console.log("need to figure out how to update");
  }

  async getRecipe() {
    // let data = await resource.get("api/recipes?deleted=false");
    let data = await resource.get("api/recipes");
    console.log(data);
    let recipes = data.map(r => new Recipe(r));
    recipes.reverse();
    STORE.commit("recipes", recipes);
    console.log("STORE.state.recipes: ", STORE.State.recipes);
  }
}

export const recipesService = new RecipesService();