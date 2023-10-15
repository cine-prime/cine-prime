import { Router } from "express";

export const routes = Router();

import _auth from "../middleware/_auth";

import userRouter from './user.routes';
import authRouter from './auth.routes';
import employeeRouter from "./employee.routes";
import moviesRouter from "./movies.routes";

// Rotas User
routes.use('/user', userRouter);

// Rotas de autenticação
routes.use("/auth", authRouter);

routes.use(_auth); // Autenticação obrigatória para rotas daqui para abaixo. 

//Rotas Funcionários
routes.use('/employee', employeeRouter);

//Rotas Movies
routes.use("/movies", moviesRouter);


