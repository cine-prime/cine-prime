import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


interface ISession {
    dateTime: Date;
    exibitionType: string;
    dublingType: string;
    idRoom: number;
    idFilm: number;
}

export class CreateSessionService {
    async execute({ dateTime, exibitionType, dublingType, idFilm, idRoom }: ISession, req: Request, res: Response) {
        let room = await prisma.session.create({
            data: {
                dateTime,
                exibitionType,
                dublingType,
                idFilm,
                idRoom
            },
        });
        return res.status(201).json(room);

    }
}