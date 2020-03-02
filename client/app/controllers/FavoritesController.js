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
      await favoritesService.create(favoriteData);
    } catch (error) {
      alert(error);
    }
  }

  async deleteFavorite(favoriteId) {
    try {
      // @ts-ignore
      await favoritesService.deleteRecipe(favoriteId);
    } catch (error) {
      console.log(error);
    }
  }

}