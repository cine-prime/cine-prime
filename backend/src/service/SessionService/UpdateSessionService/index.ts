import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ISession {
    dateTime: Date;
    exibitionType: string;
    dublingType: string;
    idRoom: number;
    idMovie: number;
    atualTicketsQtd: number;
    maxTicketsQtd: number;
}

export class UpdateSessionService {
    async execute({ dateTime, exibitionType, dublingType, idMovie, idRoom, atualTicketsQtd, maxTicketsQtd }: ISession, req: Request, res: Response) {
        const { id } = req.params;
        if (!dateTime || !exibitionType || !dublingType || idMovie === undefined || idRoom === undefined || atualTicketsQtd === undefined || maxTicketsQtd === undefined) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }
        try {
            const sessionExiste = await prisma.session.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!sessionExiste) {
                return res.status(400).json({ message: 'Sessão não existe' });
            }

            const [movieExists, roomExists] = await Promise.all([
                prisma.movie.findUnique({
                    where: { id: idMovie },
                }),
                prisma.room.findUnique({
                    where: { id: idRoom },
                }),
            ]);

            if (!movieExists) {
                return res.status(400).json({ message: 'Filme não existe' });
            }
            if (!roomExists) {
                return res.status(400).json({ message: 'Sala não existe' });
            }

            let session = await prisma.session.update({
                where: {
                    id: Number(id),
                },
                data: {
                    dateTime,
                    exibitionType,
                    dublingType,
                    idMovie,
                    idRoom,
                    atualTicketsQtd,
                    maxTicketsQtd,
                },
                include: {
                    room: true,
                    movie: true,
                },
            });
            return res.status(201).json(session);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
