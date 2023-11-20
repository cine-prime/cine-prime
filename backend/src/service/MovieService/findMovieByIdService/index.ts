import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Imovie {
    id: number;
}
export class FindMovieByIdService {
    async execute({ id }: Imovie, req: Request, res: Response) {
        if (!id) {
            return res.status(400).json({ message: 'Id não informado' });
        }
        try {
            const movieExists = await prisma.movie.findUnique({
                where: {
                    id: id,
                },
                include: {
                    sessions: true,
                },
            });

            return res.status(200).json(movieExists);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
