import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IRoom {
    qtd_max: number;
    typeExhibitionAccepted: string;
}

export class CreateRoomService {
    async execute(
        { qtd_max, typeExhibitionAccepted }: IRoom,
        req: Request,
        res: Response,
    ) {
        if (!qtd_max || !typeExhibitionAccepted) {
            return res
                .status(400)
                .json({ message: 'Preencha todos os campos' });
        }
        try {
            let room = await prisma.room.create({
                data: {
                    qtd_max,
                    typeExhibitionAccepted,
                },
            });
            return res.status(201).json(room);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
