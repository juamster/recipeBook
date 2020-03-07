
import { resource } from "./../resource.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";
import { recipesService } from "../services/RecipesService.js"
import { favoritesService } from "../services/FavoritesService.js"
import { FavoritesController } from "./FavoritesController.js"
import STORE from "../store.js";
import { Recipe } from "../Models/Recipe.js";

// Private Parts
function drawRecipes() {
  let template = "";

  STORE.State.recipes.forEach(recipe => {
    template += recipe.ListTemplate;
  });
  document.getElementById("recipe-main").innerHTML = template;

  FavoritesController.drawFavorites();
}

export class RecipesController {

  constructor() {
    this.getRecipes();
    // NOTE: actually it's ok to getRecipes without logging,
    Auth0Provider.onAuth(drawRecipes);
    STORE.subscribe("recipes", drawRecipes);
  }

  getRecipeForm() {
    document.getElementById("recipe-form").innerHTML = Recipe.formTemplate;
  }

  hideForm() {
    document.getElementById("recipe-form").innerHTML = "";
  }


  showMyRecipes() {
    console.log("drawing only user Recipes")
    let template = "";
    let hasFavorites = false;
    STORE.State.recipes.forEach(r => {
      //NOTE: check to see if there is a favorite for this
      // if so set the flag hasFavorites to true
      if (r.creatorId == Auth0Provider.userInfo.sub) {
        if (favoritesService.findFavoriteByRecipeId(r.recipeId)) {
          let hasFavorites = true;
        }
        template += r.ListTemplate;
      }
    });
    document.getElementById("recipe-main").innerHTML = template;

    // NOTE: only do this if hasFavorite is true, otherwise, there
    //  were no cards drawn with any 
    if (hasFavorites) {
      FavoritesController.drawFavorites();
    }

  }

  /*
   * this will get the list of recipeIds that are keys of the 
   * favorites, so only this users favorited recipes and print these
   * out
   */
  async showMyFavoriteRecipes() {

    let template = "";
    const recipeIds = Object.keys(STORE.State.favorites)
    // console.log("In ShowMyFavoriteRecipes: ids from favorites", recipeIds)
    recipeIds.forEach(id => {
      let recipe = STORE.State.recipes.find(r => r.recipeId == id);
      // let recipe = await recipesService.getRecipeById(id);
      template += recipe.ListTemplate;
    });
    document.getElementById("recipe-main").innerHTML = template;
    FavoritesController.drawFavorites();
  }

  async showAllRecipes() {
    drawRecipes();
  }


  async editRecipe(id) {
    // First bring that form back up
    this.getRecipeForm()

    let recipe = STORE.State.recipes.find(r => r.recipeId == id);
    let form = document.getElementById("recipeForm");
    // @ts-ignore
    form.name.value = recipe.name;
    // @ts-ignore
    form.description.value = recipe.description;
    // @ts-ignore
    form.imageURL.value = recipe.imageURL;
    // @ts-ignore
    form.ingredients.value = recipe.ingredients;
    // @ts-ignore
    form._id.value = id;
  }


  async handleSubmitRecipe() {
    //console.log("in create Recipe");
    try {
      event.preventDefault();
      let form = event.target;
      let recipeData = {
        // @ts-ignore
        name: form.name.value,
        // @ts-ignore
        description: form.description.value,
        // @ts-ignore
        ingredients: form.ingredients.value,
        // @ts-ignore
        imageURL: form.imageURL.value,
        // @ts-ignore
        recipeId: form._id.value
      };

      // @ts-ignore
      let id = form._id.value;
      if (id) {
        await recipesService.updateRecipe(recipeData);
      } else {
        // console.log("in CreateRecipe", recipeData)
        await recipesService.createRecipe(recipeData);
      }
      // @ts-ignore
      form.reset();
      document.getElementById("recipe-form").innerHTML = "";
    } catch (error) {
      alert(error);
    }
  }

  async deleteRecipe(recipeId) {
    try {
      // If you delete the recipe, you should also delete the favorites
      // TODO: also delete comments
      console.log("in delete: going to delete the favorite and recipe", recipeId);
      // First delete the favorite for this recipe if it exists, it's possible that
      // it may not.  If the recipe exists, but the user hasn't favorited it.
      let fav = favoritesService.findFavoriteByRecipeId(recipeId);
      if (fav) {
        await favoritesService.deleteFavorite(fav);
      }

      await recipesService.deleteRecipe(recipeId);
    } catch (error) {
      console.log(error);
    }
  }


  async getRecipeById(recipeId) {
    try {
      let aRecipe = await recipesService.getRecipeById(recipeId);
      //console.log("getting a recipe: ", aRecipe);
      return aRecipe;
    } catch (error) {
      console.log(error);
    }


  }

  async getRecipes() {
    // console.log("getting the recipes");
    try {
      await recipesService.getRecipe();
      //console.log(Auth0Provider)
    } catch (error) {

    }
  }


}