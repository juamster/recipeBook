
export class Comments {
  constructor(data) {
    this.recipeId = data.recipeId;
    this.writerId = data.writerId;
    this.content = data.content
    this.id = data.id;
  }


  get comment_template() {
    return `<button type="button" class="btn btn-info" onclick="app.commentsController.deleteRecipe('${this.recipeId}')">Comments</button>`
  }

}
