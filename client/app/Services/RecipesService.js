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

  async getRecipeById(id) {

    let aRecipe = STORE.State.recipes.find(r => r.recipeId == id);

    console.log("in getRecipeById, aRecipe is: ", aRecipe)
    if (!aRecipe) {
      // console.log("in getRecipeById, invalid ID is:", id)
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

  isRecipeInStore(recipeId) {
    return STORE.State.recipes.findIndex(r => r.recipeId == recipeId);
  }

  async updateRecipe(recipeData) {

    let data = await resource.put("/api/recipes/" + recipeData.recipeId, recipeData);
    let recipe = new Recipe(data);
    console.log("Did we get to....need to figure out how to update");
    let i = STORE.State.recipes.findIndex(r => r.recipeId == recipeData.recipeId);
    if (i != -1) {
      STORE.State.recipes.splice(i, 1, recipe);
      STORE.commit("recipes", STORE.State.recipes);
    }


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