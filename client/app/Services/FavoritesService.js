import { Favorites } from "../Models/Favorites.js";
import STORE from "../store.js";
import { resource } from "../resource.js"

// The services job is to control data access
class FavoritesService {

  async create(favoriteData) {
    let data = await resource.post("/api/favorites/", favoriteData);
    let favorite = new Favorites(data);
    STORE.State.favorites.push(favorite);
    STORE.commit("favorites", STORE.State.favorites);
  }

  async deleteRecipe(favoriteId) {
    let data = await resource.delete("/api/favorites/" + favoriteId);
    let i = STORE.State.favorites.findIndex(f => f.favoriteId == favoriteId);
    if (i != -1) {
      STORE.State.favorites.splice(i, 1);
      STORE.commit("favorites", STORE.State.favorites);
    }
  }

}

export const favoritesService = new FavoritesService();