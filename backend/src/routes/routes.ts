import { Router } from "express";

export const routes = Router();

//Login
import { AuthController } from "../controllers/LoginController";


import _auth from "../middleware/_auth";

import userRouter from './user.routes';
import authRouter from './auth.routes';
import employeeRouter from "./employee.routes";
import moviesRouter from "./movies.routes";
import sessionsRouter from "./session.routes";
import roomsRouter from "./room.routes";
import ticketRouter from "./ticket.routes";

// Rotas User
routes.use('/user', userRouter);


// Rotas de autenticação
routes.use("/auth", authRouter);

routes.use(_auth); // Autenticação obrigatória para rotas daqui para abaixo. 

//Rotas Rooms
routes.use('/room', roomsRouter);

//Rotas Funcionários
routes.use('/employee', employeeRouter);

//Rotas Movies
routes.use("/movie", moviesRouter);

// rotas session
routes.use("/session", sessionsRouter);

//rotas ticket
routes.use("/ticket", ticketRouter);