import { resource } from "../resource.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";
import { commentsService } from "../services/CommentsService.js"
import STORE from "../store.js";
import { Comments } from "../Models/Comments.js";
import { RecipesController } from "./RecipesController.js"
import { recipesService } from "../services/RecipesService.js";





export class FavoritesController {
  constructor() {

    // NOTE: actually it's ok to getRecipes without logging,
    //  but later, we would need to check this out before //// getting favorites, This is how you would do it if you
    // wanted to make sure that the user was logged in.
    Auth0Provider.onAuth(() => {
      this.getFavorites();
      STORE.subscribe("favorites", FavoritesController.drawFavorites);
    })
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
      console.log("@@@just got the favorites- go draw them!")
      FavoritesController.drawFavorites();
    } catch (error) {
      console.log(error);
    }
  }

  toggleFavorite(recipeId) {
    let fav = favoritesService.findFavoriteByRecipeId(recipeId)
    let color;
    if (fav) {
      this.deleteFavorite(fav)
      color = "favorite-color-black";
    } else {
      color = "favorite-color-green";
      this.createFavorite(recipeId)
    }
    document.getElementById(recipeId).innerHTML = favoritesTemplate(recipeId, color);
  }

  async deleteFavorite(favorite) {
    try {
      // @ts-ignore
      await favoritesService.deleteFavorite(favorite);
    } catch (error) {
      console.log(error);
    }
  }

  static drawFavorites() {
    console.log("drawing Favorites icon")

    const ids = Object.keys(STORE.State.favorites)
    console.log("ids from favorites", ids)
    ids.forEach(id => {
      console.log("this recipe id is: ", id);
      let color = 'favorite-color-black';
      if (favoritesService.findFavoriteByRecipeId(id)) {
        console.log("found a favorite for recipeId: ", id)
        color = 'favorite-color-green';
      }
      console.log("@@ drawFavorites, adding to innerHTML at: ", id);
      document.getElementById(id).innerHTML = favoritesTemplate(id, color);
      // let inStore = recipesService.isRecipeInStore(id)
      // if (inStore != -1) {
      //   console.log("Found this recipe in the STORE - adding to id.innerHTML", id)
      //   document.getElementById(id).innerHTML = favoritesTemplate(id, color);
      // }
    });
  }

}