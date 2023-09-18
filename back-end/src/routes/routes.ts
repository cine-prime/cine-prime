import { Router } from "express";

export const routes = Router();

//User
import { CreateUserController, DeleteUserController, ListarUsersController, ListarUsersEmailController, findUserById, UpdateUserController } from "../controllers/UserController";

//Login
import { AuthController } from "../controllers/LoginController";

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const listarUsersController = new ListarUsersController();
const listarUserController = new ListarUsersEmailController();
const findUserByIdController = new findUserById();
const updateUserController = new UpdateUserController();

const authController = new AuthController();

//Rotas User
routes.post("/user", createUserController.store);
routes.delete("/user/:id", deleteUserController.delete);
routes.get("/user", listarUsersController.index);
routes.get("/user", listarUserController.listarUsers);
routes.get("/user/:id", findUserByIdController.find);
routes.put("/user/:id", updateUserController.update);

// Rotas de autenticação
routes.post("/auth", authController.execute);


