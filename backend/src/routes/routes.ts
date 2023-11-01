import { Router } from "express";

export const routes = Router();

//User
import { CreateUserController, DeleteUserController, ListarUsersController, ListarUsersEmailController, findUserById, UpdateUserController } from "../controllers/UserController";

//Movie
import { CreateMovieController, ListMoviesController, FindMovieByIdController, DeleteMovieController, UpdateMovieController } from "../controllers/MovieController";

//Login
import { AuthController } from "../controllers/LoginController";

// User objects
const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const listarUsersController = new ListarUsersController();
const listarUserController = new ListarUsersEmailController();
const findUserByIdController = new findUserById();
const updateUserController = new UpdateUserController();

// Movie objects
const createMovieController = new CreateMovieController();
const listMovieController = new ListMoviesController();
const findMovieByIdController = new FindMovieByIdController();
const deleteMovieController = new DeleteMovieController();
const updateMovieController = new UpdateMovieController();

// Auth Objects
const authController = new AuthController();

//Rotas User
routes.post("/user", createUserController.store);
routes.delete("/user/:id", deleteUserController.delete);
routes.get("/user", listarUsersController.index);
routes.get("/user", listarUserController.listarUsers);
routes.get("/user/:id", findUserByIdController.find);
routes.put("/user/:id", updateUserController.update);

//Rotas Movies
routes.post("/movies", createMovieController.store);
routes.get("/movies", listMovieController.index)
routes.get("/movies/:id", findMovieByIdController.find)
routes.put("/movies/:id", updateMovieController.update)
routes.delete("/movies/:id", deleteMovieController.delete)

// Rotas de autenticação
routes.post("/auth", authController.execute);


