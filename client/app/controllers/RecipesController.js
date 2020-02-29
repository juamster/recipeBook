
import { resource } from "./../resource.js";
import { Auth0Provider } from "../auth/Auth0Provider.js"
export class RecipesController {
  constructor() {
    // NOTE: actually it's ok to getRecipes without logging,
    //  but later, we would need to check this out before //// getting favorites, This is how you would do it if you
    // wanted to make sure that the user was logged in.
    Auth0Provider.onAuth(this.getRecipes);
  }

  async getRecipes() {
    try {
      //NOTE: this really belongs in a service
      await resource.get("api/recipes");
      console.log(Auth0Provider)
    } catch (error) {

    }
  }
}