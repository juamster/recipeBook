import { Favorites } from "../Models/Favorites.js";
import STORE from "../store.js";
import { resource } from "../resource.js"
import { Recipe } from "../models/Recipe.js";

// The services job is to control data access
class FavoritesService {

  async create(favoriteData) {
    let data = await resource.post("/api/favorites/", favoriteData);
    let favorite = new Favorites(data);
    STORE.State.favorites[favorite.recipeId] = favorite;
    STORE.commit("favorites", STORE.State.favorites);
  }

  async getFavorites() {

    let data = await resource.get("api/favorites");
    console.log(data);
    // let favorite = data.map(f => new Favorites(f));
    let favorites = {}
    data.forEach(f => favorites[f.recipeId] = f)

    // {
    //   "dsjaj0f9wj2390fja": true,
    //   "dsjaj0f9wj2390fja": true,
    //   "dsjaj0f9wj2390fja": true,
    //   "dsjaj0f9wj2390fja": true,
    // }

    // recipes.reverse();
    STORE.commit("favorites", favorites);
    console.log("STORE.state.favorites: ", STORE.State.favorites);
  }

  async deleteFavoriteByRecipeId(recipeId) {
    // first go and get the favorite that matches this recipeId
    console.log("the recipe id is: ", recipeId);
    let data = await resource.get("/api/favorites?recipeId=" + recipeId);
    let favorite = data.map(f => new Favorites(f));
    console.log("got a favorite based on recipeId", favorite.favoriteId);
    this.deleteFavorite(favorite.favoriteId);
  }

  async deleteFavorite(favorite) {
    let data = await resource.delete("/api/favorites/" + favorite.id);
    delete STORE.State.favorites[favorite.recipeId]

    // let i = STORE.State.favorites.findIndex(f => f.favoriteId == favoriteId);
    // if (i != -1) {
    //   STORE.State.favorites.splice(i, 1);
    STORE.commit("favorites", STORE.State.favorites);
    // }
  }

  findFavoriteByRecipeId(recipeId) {
    return STORE.State.favorites[recipeId]
  }

}



export const favoritesService = new FavoritesService();