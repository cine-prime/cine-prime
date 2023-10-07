import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Imovie {
    id: number;
}
export class FindMovieByIdService {
    async execute({id}:Imovie,req: Request, res: Response ) {

      console.log(id);

        const movieExists = await prisma.movie.findUnique({
            where: {
                id: id,
            },
        });

        console.log(movieExists);

        return res.status(200).json(movieExists);
    }
}