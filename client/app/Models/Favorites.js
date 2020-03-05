export class Favorites {
  constructor(data) {
    this.recipeId = data.recipeId;
    this.userId = data.userId;
    this.favoriteId = data.id; // this is really a duplicate item.  Didn't want to break something
    this.id = data.id;
  }



}