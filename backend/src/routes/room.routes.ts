import { Router } from "express";
import {CreateRoomController,DeleteRoomController,FindRoomByIdController,ListRoomsController,UpdateRoomController} from "../controllers/RoomController";

const roomRouter = Router();

const createRoomController = new CreateRoomController();
const listRoomsController = new ListRoomsController();
const findRoomByIdController = new FindRoomByIdController();
const deleteRoomController = new DeleteRoomController();
const updateRoomController = new UpdateRoomController();

roomRouter.post("/", createRoomController.store);
roomRouter.get("/", listRoomsController.index)
roomRouter.get("/:id", findRoomByIdController.find)
roomRouter.put("/:id", updateRoomController.update)
roomRouter.delete("/:id", deleteRoomController.delete)

export default roomRouter;
