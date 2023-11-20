import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IRoom {
    qtd_max: number;
    typeExhibiyionAccepted: string;
}

export class ListRoomsService {
    async execute(_req: Request, res: Response){
        const rooms = await prisma.room.findMany();
        return res.json(rooms);
    }
}