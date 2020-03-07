import { AuthController } from "./auth/AuthController.js";
import { resource } from "./resource.js";
import { RecipesController } from "./controllers/RecipesController.js";
import { FavoritesController } from "./controllers/FavoritesController.js";
import { CommentsController } from "./controllers/CommentsController.js";


resource.get("api/recipes");
class App {
  authController = new AuthController();
  recipesController = new RecipesController();
  favoritesController = new FavoritesController();

  commentsController = new CommentsController();
}

window["app"] = new App();
