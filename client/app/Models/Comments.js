import { CommentsController } from "../controllers/CommentsController.js";

export class Comments {
  constructor(data) {
    this.recipeId = data.recipeId;
    this.writerId = data.writerId;
    this.content = data.content;
    this.id = data.id;
  }

  static commentFormTemplate(thisId) {
    return /* html */ `
      <form  class="nice-form border d-inline-flex" id="commentform" onsubmit="app.commentsController.createComments('${thisId}')" >
        <div class="form-row p-2">
          <input name="_id" type="text" class="d-none" disabled />
          <div class="form-group">
            <label for="description">Comment </label>
            <input name="description" type="text" class="form-control" />
          </div> 
        </div>
        <div class="form-group form-row align-self-end myBtn">
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </form >
      `;
  }

}
