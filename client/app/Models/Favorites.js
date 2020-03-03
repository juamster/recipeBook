export class Favorites {
  constructor(data) {
    this.recipeId = data.recipeId;
    this.userId = data.userId;
    this.favoriteId = data.id;
    this.id = data.id;
  }

  get ListTemplate() {
    return /*html*/ `
    <i class="fas fa-heart justify-content-end" onclick="app.recipeController.favoriteRecipe('${this.recipeId}')"></i>
    `;
  }

  // get DetailTemplate() {
  //   return /*html*/ `
  //   <div>
  //     <h1 class="project-title">${this.name}</h1>
  //     <p class="project-description">${this.description}</p>
  //   </div>
  //   `;
  // }
}