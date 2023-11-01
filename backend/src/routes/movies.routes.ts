import { Router } from "express";
import { CreateMovieController, ListMoviesController, FindMovieByIdController, DeleteMovieController, UpdateMovieController } from "../controllers/MovieController";

const moviesRouter = Router();

const createMovieController = new CreateMovieController();
const listMovieController = new ListMoviesController();
const findMovieByIdController = new FindMovieByIdController();
const deleteMovieController = new DeleteMovieController();
const updateMovieController = new UpdateMovieController();

moviesRouter.post("/", createMovieController.store);
moviesRouter.get("/", listMovieController.index)
moviesRouter.get("/:id", findMovieByIdController.find)
moviesRouter.put("/:id", updateMovieController.update)
moviesRouter.delete("/:id", deleteMovieController.delete)

export default moviesRouter;