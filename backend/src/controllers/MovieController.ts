import { Request, Response } from "express";

import { CreateMovieService } from "../service/MovieService/CreateMovieService";
import { DeleteMovieService } from "../service/MovieService/DeleteMovieService";
import { ListarMoviesService } from "../service/MovieService/findAllMoviesService";
import { UpdateMovieService } from "../service/MovieService/UpdateMovieService";
import { FindMovieByIdService } from "../service/MovieService/findMovieByIdService";

interface IMovie {
    name: string;
    genre: string;
    duration: number;
    classification: string;
    synopsis: string;
}

export class CreateMovieController {
    async store(req: Request, res: Response) {
        const { name, genre, duration, classification, synopsis }: IMovie = req.body;
        const createMovieService = new CreateMovieService();

        const movie = await createMovieService.execute(
          { name, genre, duration, classification, synopsis },
          req,
          res
        );
    
        return movie;
    }
}

export class ListMoviesController {
    async index(req: Request, res: Response) {
  
      const listMoviesService = new ListarMoviesService(); 
  
      const movie = await listMoviesService.execute(
        req,
        res
      );
  
      return movie;
    }
}


export class UpdateMovieController {
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, genre, duration, classification, synopsis }: IMovie = req.body;

    const updateMovieService = new UpdateMovieService();

    const movie = await updateMovieService.execute(
      { id: Number(id), name, genre, duration, classification, synopsis },
      req,
      res
    );

    return movie;
  }
}

export class FindMovieByIdController {
  async find(req: Request, res: Response) {
    const { id } = req.params;

    const findMovieByIdService = new FindMovieByIdService();

    const movie = await findMovieByIdService.execute(
      { id: Number(id) },
      req,
      res
    );

    return movie;
  }
}

export class DeleteMovieController {
  async delete(req: Request, res: Response) {

    const deleteMovieService = new DeleteMovieService();

    const movie = await deleteMovieService.execute(
      req,
      res
    );

    return movie;
  }
}