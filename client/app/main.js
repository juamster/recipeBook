import { AuthController } from "./auth/AuthController.js";
import { resource } from "./resource.js";
import { RecipesController } from "./controllers/RecipesController.js";


resource.get("api/recipes");
class App {
  authController = new AuthController();
  recipeController = new RecipesController();
}

window["app"] = new App();
