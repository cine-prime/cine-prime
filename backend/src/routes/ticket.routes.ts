import { Router } from "express";
import {CreateTicketController,DeleteTicketController,FindTicketByIdController,ListTicketsController,UpdateTicketController} from "../controllers/TicketController";

const ticketRouter = Router();

const createTicketController = new CreateTicketController();
const listTicketsController = new ListTicketsController();
const findTicketByIdController = new FindTicketByIdController();
const deleteTicketController = new DeleteTicketController();
const updateTicketController = new UpdateTicketController();

ticketRouter.post("/", createTicketController.store);
ticketRouter.get("/", listTicketsController.index)
ticketRouter.get("/:id", findTicketByIdController.find)
ticketRouter.put("/:id", updateTicketController.update)
ticketRouter.delete("/:id", deleteTicketController.delete)

export default ticketRouter;
