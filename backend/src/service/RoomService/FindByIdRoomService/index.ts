import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IRoom {
    id: number;
}
export class FindRoomByIdService {
    async execute({id}:IRoom,req: Request, res: Response ) {

      console.log(id);

        const roomExists = await prisma.room.findUnique({
            where: {
                id: id,
            },
        });

        console.log(roomExists);

        return res.status(200).json(roomExists);
    }
}