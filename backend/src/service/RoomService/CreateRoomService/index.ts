import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


interface IRoom {
    qtd_max: number;
    typeExhibitionAccepted: string;
}

export class CreateRoomService {
    async execute({ qtd_max, typeExhibitionAccepted }: IRoom, req: Request, res: Response) {
        let room = await prisma.room.create({
            data: {
                qtd_max,
                typeExhibitionAccepted
            },
        });
        return res.status(201).json(room);

    }
}