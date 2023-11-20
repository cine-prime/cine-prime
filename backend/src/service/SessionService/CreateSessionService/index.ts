import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ISession {
    dateTime: Date;
    exibitionType: string;
    dublingType: string;
    idRoom: number;
    idFilm: number;
    atualTicketsQtd: number;
    maxTicketsQtd: number;
}

export class CreateSessionService {
    async execute({ dateTime, exibitionType, dublingType, idFilm, idRoom, atualTicketsQtd, maxTicketsQtd }: ISession, req: Request, res: Response) {
        if (!dateTime || !exibitionType || !dublingType || !idFilm || !idRoom || !atualTicketsQtd || !maxTicketsQtd) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }
        try {
            let room = await prisma.session.create({
                data: {
                    dateTime,
                    exibitionType,
                    dublingType,
                    idFilm,
                    idRoom,
                    atualTicketsQtd,
                    maxTicketsQtd,
                },
            });
            return res.status(201).json(room);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
