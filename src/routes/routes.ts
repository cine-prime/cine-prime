import { Router } from "express";

export const routes = Router();

//User
import { CreateUserController } from "../controllers/UserController";

const createUserController = new CreateUserController();

// Rotas Login
routes.post("/user", createUserController.store);
