import { Router } from 'express';
import { CreateUserController, DeleteUserController, ListarUsersController, ListarUsersEmailController, findUserById, UpdateUserController } from "../controllers/UserController";
import _auth from '../middleware/_auth';

const routes = Router();

// User objects
const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const listarUsersController = new ListarUsersController();
const listarUserController = new ListarUsersEmailController();
const findUserByIdController = new findUserById();
const updateUserController = new UpdateUserController();

routes.post("/", createUserController.store);
routes.use(_auth);
routes.delete("/:id", deleteUserController.delete);
routes.get("/", listarUsersController.index);
routes.get("/", listarUserController.listarUsers);
routes.get("/:id", findUserByIdController.find);
routes.put("/:id", updateUserController.update);

export default routes;