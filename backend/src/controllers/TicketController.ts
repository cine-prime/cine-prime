import { Request, Response } from "express";

import { CreateTicketService } from "../service/TicketService/CreateTicketService";
import { DeleteTicketService } from "../service/TicketService/DeleteTicketService";
import { FindTicketByIdService } from "../service/TicketService/FindByIdTicketService";
import { ListTicketsService } from "../service/TicketService/FindAllTicketsService";
import { UpdateTicketService } from "../service/TicketService/UpdateTicketService";

interface ITicket {
  idUser: number;
  idSession: number;
  type: string;
}


export class CreateTicketController {
    async store(req: Request, res: Response) {
        const { idUser, idSession,type }: ITicket = req.body;
        const createTicketService = new CreateTicketService();

        const ticket = await createTicketService.execute(
          { idUser, idSession,type },
          req,
          res
        );
    
        return ticket;
    }
}

export class ListTicketsController {
    async index(req: Request, res: Response) {
  
      const listTicketsService = new ListTicketsService(); 
  
      const ticket = await listTicketsService.execute(
        req,
        res
      );
  
      return ticket;
    }
}


export class UpdateTicketController {
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { type }: ITicket = req.body;

    const updateTicketService = new UpdateTicketService();

    const ticket = await updateTicketService.execute(
      { type },
      req,
      res
    );

    return ticket;
  }
}

export class FindTicketByIdController {
  async find(req: Request, res: Response) {
    const { id } = req.params;

    const findTicketByIdService = new FindTicketByIdService();

    const ticket = await findTicketByIdService.execute(
      { id: Number(id) },
      req,
      res
    );

    return ticket;
  }
}

export class DeleteTicketController {
  async delete(req: Request, res: Response) {

    const deleteTicketService = new DeleteTicketService();

    const ticket = await deleteTicketService.execute(
      req,
      res
    );

    return ticket;
  }
}