import { AuthController } from "../auth/AuthController.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";
import { favoritesService } from "../services/FavoritesService.js"



function avatarTemplate(name, picture) {
  return  /*html*/ `
    <div>
      <img class="rounded-circle" src="${picture}" alt="${name}" height="25"/>
      <span class="ml-2">${name}</span>
    </div>`
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

    let loggedIn = "";

    let img_template = `<img class="card-img-top" src="${this.imageURL} " width="50px" alt="food")" >`;



    if (Auth0Provider.isAuthenticated) {
      // console.log("Someone logged in!!!!");
      let trash_template = "";

      if (Auth0Provider.userInfo.sub == this.creatorId) {
        // console.log("this user can have a trash can - is owner of recipe");
        trash_template += `<i class="fas fa-trash-alt fa-lg trash" onclick="app.recipesController.deleteRecipe('${this.recipeId}')"></i>`

        // if the user is logged in
        img_template = `<img class="card-img-top" src="${this.imageURL}" width="50px" alt="food" onclick="app.recipesController.editRecipe('${this.recipeId}')" > `
      }
      loggedIn +=
        `<div class="card-body d-flex justify-content-between">
            <div id="${this.recipeId}">
              <i class="fas fa-heart favorite-color-black" onclick="app.favoritesController.toggleFavorite('${this.recipeId}')"></i>
            </div> 
            ${trash_template} 
          </div>`

    }
    return /*html*/ `
    <div class="col-sm-6">
        <div class="card">
         ${img_template} ${userAvatar} ${loggedIn} 
      <div class="card-body"> 
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">${this.description}</p>
            
          </div>
          <div class="row card-footer">
            <small class="text-muted">${this.ingredients}</small>
          </div>


          <div>
            <button type="button" class="btn btn-info btn-sm" onclick="app.commentsController.drawComments('${this.recipeId}')">Show Comments</button>
            <button type="button" class="btn btn-info btn-sm" onclick="app.commentsController.hideComments('${this.recipeId}')">Hide Comments</button>
            <button type="button" class="btn btn-info btn-sm" onclick="app.commentsController.getCommentsForm('${this.recipeId}')">Create Comments</button>
            <div id="comment-${this.recipeId}"> </div>

            <div id="comment-form-${this.recipeId}"></div>
          </div>

        </div>
      </div>
    `;
  }



  static get formTemplate() {
    return /* html */ `
      <form  class="nice-form border d-inline-flex" id="recipeForm" onsubmit="app.recipesController.handleSubmitRecipe()">
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
            <button class="btn btn-danger" type="reset" onclick="app.recipesController.hideForm()">Cancel</button>
          </div>
        </div>

      </form>
    `;

  }
}