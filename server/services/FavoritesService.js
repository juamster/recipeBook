import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import mongoose from "mongoose";
import Favorite from "../models/Favorite"


class FavoritesService {
  async create(favoriteData) {
    return await dbContext.Favorites.create(favoriteData);
  }
  async get(query = {}) {
    let favorites = await dbContext.Favorites.find(query);
    return favorites;
  }
  async update(id, updateData) {
    // do some business logic
    let aFavorite = await this.getById(id);
    // @ts-ignore
    if (!aFavorite.deleted) {
      return await dbContext.Favorites.findByIdAndUpdate(id, updateData, { new: true });
    }
  }

  async getById(id) {
    let favorite = await dbContext.Favorites.findById(id);
    if (!favorite) {
      throw new BadRequest("Invalid Id");
    }
    return favorite;
  }

  async delete(id) {
    let data = await this.getById(id);
    // @ts-ignore
    if (!data.deleted) {
      // @ts-ignore
      data.deleted = true;
      return await dbContext.Favorites.findByIdAndUpdate(id, data, { new: true });
    } else {
      throw new BadRequest("This Favorite is already deleted ");
    }

  }
}

export const favoriteService = new FavoritesService();