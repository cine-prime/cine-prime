import { Router } from "express";
import { 
    CreateSessionController, 
    ListSessionsController, 
    FindSessionByIdController, 
    DeleteSessionController, 
    UpdateSessionController 
} from "../controllers/SessionController";

const sessionsRouter = Router();

const createSessionController = new CreateSessionController();
const listSessionController = new ListSessionsController();
const findSessionByIdController = new FindSessionByIdController();
const deleteSessionController = new DeleteSessionController();
const updateSessionController = new UpdateSessionController();

sessionsRouter.post("/", createSessionController.store);
sessionsRouter.get("/", listSessionController.index)
sessionsRouter.get("/:id", findSessionByIdController.find)
sessionsRouter.put("/:id", updateSessionController.update)
sessionsRouter.delete("/:id", deleteSessionController.delete)

export default sessionsRouter;