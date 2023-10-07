import { Router } from "express";
import { CreateRoomController, ListRoomsController, FindRoomByIdController, DeleteRoomController, UpdateRoomController } from "../controllers/RoomController";

const RoomsRouter = Router();

const createRoomController = new CreateRoomController();
const listRoomsController = new ListRoomsController();
const findRoomByIdController = new FindRoomByIdController();
const deleteRoomController = new DeleteRoomController();
const updateRoomController = new UpdateRoomController();

RoomsRouter.post("/", createRoomController.store);
RoomsRouter.get("/", listRoomsController.index)
RoomsRouter.get("/:id", findRoomByIdController.find)
RoomsRouter.put("/:id", updateRoomController.update)
RoomsRouter.delete("/:id", deleteRoomController.delete)

export default RoomsRouter;