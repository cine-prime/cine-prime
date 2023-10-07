import { Request, Response } from "express";

import { CreateRoomService } from "@src/service/RoomService/CreateRoomService";
import { DeleteRoomService } from "@src/service/RoomService/DeleteRoomService";
import { FindRoomByIdService } from "@src/service/RoomService/FindByIdRoomService";
import { ListRoomsService } from "@src/service/RoomService/FindAllRoomsService";
import { UpdateRoomService } from "@src/service/RoomService/UpdateRoomService";

interface IRoom {
    qtd_max: number;
    typeExhibitionAccepted: string;
}


export class CreateRoomController {
    async store(req: Request, res: Response) {
        const { qtd_max, typeExhibitionAccepted }: IRoom = req.body;
        const createRoomService = new CreateRoomService();

        const room = await createRoomService.execute(
          { qtd_max, typeExhibitionAccepted },
          req,
          res
        );
    
        return room;
    }
}

export class ListRoomsController {
    async index(req: Request, res: Response) {
  
      const listRoomsService = new ListRoomsService(); 
  
      const room = await listRoomsService.execute(
        req,
        res
      );
  
      return room;
    }
}


export class UpdateRoomController {
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { qtd_max, typeExhibitionAccepted }: IRoom = req.body;

    const updateRoomService = new UpdateRoomService();

    const room = await updateRoomService.execute(
      { qtd_max, typeExhibitionAccepted },
      req,
      res
    );

    return room;
  }
}

export class FindRoomByIdController {
  async find(req: Request, res: Response) {
    const { id } = req.params;

    const findRoomByIdService = new FindRoomByIdService();

    const room = await findRoomByIdService.execute(
      { id: Number(id) },
      req,
      res
    );

    return room;
  }
}

export class DeleteRoomController {
  async delete(req: Request, res: Response) {

    const deleteRoomService = new DeleteRoomService();

    const room = await deleteRoomService.execute(
      req,
      res
    );

    return room;
  }
}