import { AuthController } from "../auth/AuthController.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";


function avatarTemplate(name, picture) {
  return  /*html*/ `
    <div>
      <img class="rounded-circle" src="${picture}" alt="${name}" height="25"/>
      <span class="ml-2">${name}</span>
    </div>`
    ;
}

function favoritesAndDeleteTemplate(recipeId) {
  return  /*html*/ `
     <div class="card-body d-flex justify-content-between">
          <i class="fas fa-heart" onclick="app.recipesController.favoriteRecipe('${recipeId}')"></i>
          <i class="fas fa-trash-alt fa-lg trash" onclick="app.recipesController.deleteRecipe('${recipeId}')"></i>
      </div>
  `
    ;
}
export class Recipe {
  constructor(data) {
    this.name = data.name;
    this.imageURL = data.imageURL;
    this.description = data.description;
    this.ingredients = data.ingredients;
    this.likes = data.likes;
    this.creatorId = data.creatorId;
    this.creatorName = data.creatorName;
    this.creatorPicture = data.creatorPicture;
    this.recipeId = data.id;
  }


  get ListTemplate() {
    let userAvatar = avatarTemplate(this.creatorName, this.creatorPicture);
    let favAndDelete = "";
    if (Auth0Provider.userInfo.sub == this.creatorId) {
      favAndDelete += favoritesAndDeleteTemplate(this.recipeId);
    }

    return /*html*/ `
      <div class="col-sm-6">
        <div class="card">
        <img class="card-img-top"src="${this.imageURL}" width="50px" alt="food" onclick="app.recipesController.viewRecipe('${this.recipeId}')" > `
      + userAvatar + favAndDelete +
      ` 
          <div class="card-body "> 
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">${this.description}</p>
            <a href="#" class="btn btn-primary">Comment on this recipe</a>
          </div>
          <div class="row card-footer">
            <small class="text-muted">${this.ingredients}</small>
          </div>
        </div>
      </div>
    `;
  }

  static get formTemplate() {
    return /* html */ `
      <form  class="nice-form border d-inline-flex" onsubmit="app.recipesController.createRecipe()">
       <input name="_id" type="text" class="d-none" disabled />
        <div class="form-row p-2">
          <input name="_id" type="text" class="d-none" disabled />
          <div class="form-group">
            <label for="name">Recipe Name:</label>
            <input name="name" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <input name="description" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="imageURL">Image URL:</label>
            <input name="imageURL" type="text" class="form-control" />
          </div>
          
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="ingredients">Ingredients: </label>
            <input name="ingredients" type="text" class="form-control" />
          </div>
          
          <div class="form-group form-row align-self-end myBtn">
            <button class="btn btn-primary" type="submit">Submit</button>
            <button class="btn btn-danger" type="reset" onclick="app.recipesController.showAllRecipes()">Cancel</button>
          </div>
        </div>

      </form>
    `;

  }
}