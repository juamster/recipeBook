import { resource } from "../resource.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";
import { commentsService } from "../services/CommentsService.js"
import STORE from "../store.js";
import { Comments } from "../Models/Comments.js";
import { RecipesController } from "./RecipesController.js"
import { recipesService } from "../services/RecipesService.js";

function comment_template(content) {
  return `
    <div>
      <h5>${content}</h5>
    </div>`;
}



export class CommentsController {
  constructor() {

    // NOTE: actually it's ok to getRecipes without logging,
    //  but later, we would need to check this out before //// getting favorites, This is how you would do it if you
    // wanted to make sure that the user was logged in.
    Auth0Provider.onAuth(() => {
      this.getComments();
      STORE.subscribe("commentsList", this.drawComments);
    })
  }

  /*
  * This should add a comment for this recipeId
  */

  async createComments(recipeId) {

    console.log("@@@@ going to create a comment for recipeId", recipeId)
    try {
      event.preventDefault();
      let form = event.target;
      let commentData = {
        // @ts-ignore
        content: form.description.value,
        // @ts-ignore
        recipeId: recipeId
        // @ts-ignore
        // commentId: form._id.value
      };

      console.log("creating a comment", commentData);
      await commentsService.create(commentData);
      // @ts-ignore
      form.reset();
      document.getElementById("comment-form-" + recipeId).innerHTML = "";
    } catch (error) {
      alert(error);
    }
  }
  hideForm(recipeId) {
    document.getElementById("comment-form-" + recipeId).innerHTML = "";
  }

  getCommentsForm(recipeId) {
    console.log("in getCommentsForm, recipeId is:", recipeId);

    document.getElementById("comment-form-" + recipeId).innerHTML = Comments.commentFormTemplate(recipeId);
  }
  async getComments() {
    try {
      await commentsService.getComments();
      // NOTE: where should we draw the comments? OR should we wait 
      // for the user to press a button first and go to a new screen
      console.log("@@@just got the comments- go draw them!")

    } catch (error) {
      console.log(error);
    }
  }

  hideComments(id) {
    document.getElementById("comment-" + id).innerHTML = "";
  }

  drawComments(id) {
    // console.log("Button clicked!!  drawing Comments")
    if (id) {


      let template = "";
      let commentArray = STORE.State.commentsList[id]
      if (commentArray) {
        commentArray.forEach(c => {

          template += comment_template(c.content);
        });
      } else {
        template = `<div><h5>There are no comments</h5></div>`
      }
      console.log("In drawComments - id is: ", id)
      document.getElementById("comment-" + id).innerHTML = template;
    }
  }

}