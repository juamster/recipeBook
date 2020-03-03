import { resource } from "../resource.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";
import { favoritesService } from "../services/FavoritesService.js"
import STORE from "../store.js";
import { Favorites } from "../Models/Favorites.js";
import { RecipesController } from "./RecipesController.js"

export class FavoritesController {
  constructor() {

    // NOTE: actually it's ok to getRecipes without logging,
    //  but later, we would need to check this out before //// getting favorites, This is how you would do it if you
    // wanted to make sure that the user was logged in.
    Auth0Provider.onAuth(this.getFavorites);
    // Yes, I do mean to register updateRecipes
    STORE.subscribe("favorites", RecipesController.updateRecipes);
  }

  /*
  * This should create a favorite for this recipeId
  */
  async createFavorite(recipeId) {
    try {
      let favoriteData = {
        // @ts-ignore
        recipeId: recipeId
      };
      console.log("creating a favorite");
      await favoritesService.create(favoriteData);
    } catch (error) {
      alert(error);
    }
  }



  async getFavorites() {
    try {
      await favoritesService.getFavorites();
    } catch (error) {
      console.log(error);
    }
  }

  toggleFavorite(recipeId) {
    let fav = favoritesService.findFavoriteByRecipeId(recipeId)
    if (fav) {
      this.deleteFavorite(fav)
    } else {
      this.createFavorite(recipeId)
    }
  }

  async deleteFavorite(favorite) {
    try {
      // @ts-ignore
      await favoritesService.deleteFavorite(favorite);
    } catch (error) {
      console.log(error);
    }
  }

}