import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DeleteMovieService {
    async execute(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ Message: 'Id não informado' });
        }
        try {
            const movie = await prisma.movie.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (movie) {
                await prisma.movie.delete({
                    where: {
                        id: Number(id),
                    },
                });
            } else {
                return res.status(400).json({ Message: 'Filme inexistente' });
            }

            return res
                .status(200)
                .json({ Message: 'Filme removido com sucesso!' });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
