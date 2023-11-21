import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Iuser {
    id: number;
}
export class FindUserByIdService {
    async execute({ id }: Iuser, req: Request, res: Response) {
        if (!id) {
            return res.status(400).json({ message: 'Id não informado' });
        }
        try {
            const userExists = await prisma.user.findUnique({
                where: {
                    id: id,
                },
                include: {
                    tickets: true,
                },
            });

            return res.status(200).json(userExists);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
