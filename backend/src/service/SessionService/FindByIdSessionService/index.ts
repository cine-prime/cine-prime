import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IRoom {
    id: number;
}
export class FindRoomByIdService {
    async execute({id}:IRoom,req: Request, res: Response ) {
        const roomExists = await prisma.room.findUnique({
            where: {
                id: id,
            },
        });
        return res.status(200).json(roomExists);
    }
}