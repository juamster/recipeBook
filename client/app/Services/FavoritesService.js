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
    console.log("**** In getFavorites - these are the favorites from the Database: ", data);
    let favorites = {}
    data.forEach(f => favorites[f.recipeId] = f)

    STORE.commit("favorites", favorites);
    console.log("**** In getFavorites - STORE.state.favorites: ", STORE.State.favorites);
  }

  async deleteFavorite(favorite) {
    let data = await resource.delete("/api/favorites/" + favorite.id);
    delete STORE.State.favorites[favorite.recipeId]
    // console.log("**** in deleteFavorites: this is what's in favorites", STORE.State.Favorites)

    STORE.commit("favorites", STORE.State.favorites);
  }

  findFavoriteByRecipeId(recipeId) {
    return STORE.State.favorites[recipeId]
  }

}

export const favoritesService = new FavoritesService();