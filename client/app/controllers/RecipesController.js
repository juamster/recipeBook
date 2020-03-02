
import { resource } from "./../resource.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";
import { recipesService } from "../services/RecipesService.js"
import STORE from "../store.js";
import { Recipe } from "../Models/Recipe.js";

// Private Parts
function drawRecipes() {
  console.log("drawing Recipes")
  let template = "";
  STORE.State.recipes.forEach(recipe => {
    template += recipe.ListTemplate;
  });
  document.getElementById("recipe-main").innerHTML = template;
}



export class RecipesController {

  constructor() {
    this.getRecipes();
    // NOTE: actually it's ok to getRecipes without logging,
    //  but later, we would need to check this out before //// getting favorites, This is how you would do it if you
    // wanted to make sure that the user was logged in.
    Auth0Provider.onAuth(this.getRecipes);
    STORE.subscribe("recipes", drawRecipes);
  }

  getRecipeForm() {
    document.getElementById("recipe-form").innerHTML = Recipe.formTemplate;
  }

  showAllRecipes() {
    drawRecipes();
  }

  showMyRecipes() {
    console.log("drawing only user Recipes")
    let template = "";
    STORE.State.recipes.forEach(r => {
      if (r.creatorId == Auth0Provider.userInfo.sub) {
        template += r.ListTemplate;
      }
    });
    document.getElementById("recipe-main").innerHTML = template;
  }

  showMyFavoriteRecipes() {
    console.log("drawing only user favorited Recipes")
    let template = "";
    STORE.State.favorites.forEach(f => {
      // check to see if this favorite is one of mine
      if (f.creatorId == Auth0Provider.userInfo.sub) {
        // get recipe by ID f.recipeId then
        // use that recipe's list template
        // @ts-ignore
        let aRecipe = this.getRecipeById(f.recipeId);
        template += aRecipe.ListTemplate;
      }
    });
    document.getElementById("recipe-main").innerHTML = template;
  }


  static updateRecipes() {
    drawRecipes();
  }
  async updateRecipe() {
    try {
      // @ts-ignore
      await recipesService.editRecipe();
    } catch (error) {
      console.log(error);
    }
  }
  async createRecipe() {
    console.log("in create Recipe");
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
        imageURL: form.imageURL.value
      };
      // @ts-ignore
      let id = form._id.value;
      if (id) {
        await recipesService.updateRecipe(recipeData);
      } else {
        console.log("in CreateRecipe", recipeData)
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
      // @ts-ignore
      await recipesService.deleteRecipe(recipeId);
    } catch (error) {
      console.log(error);
    }
  }

  // async favRecipe(recipeId) {
  //   console.log("This is a favorite")
  //   try {
  //     await recipesService.favRecipe(recipeId);
  //     drawRecipes();
  //   } catch (error) {
  //     alert(error);
  //   }
  // }
  // async viewRecipe(recipeId) {
  //   try {
  //     await recipesService.setActiveRecipe(recipeId);
  //     drawRecipes();
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  static async getRecipeById(recipeId) {
    let aRecipe = await recipesService.getRecipeById(recipeId);
    console.log("getting a recipe: ", aRecipe);
    return aRecipe;
  }

  async getRecipes() {
    console.log("getting the recipes");
    try {
      //NOTE: this really belongs in a service - like fetch, but includes the bearer token, 
      await recipesService.getRecipe();
      // await resource.get("api/recipes");
      console.log(Auth0Provider)
    } catch (error) {

    }
  }


}