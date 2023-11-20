import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IUser {
    email: string;
}

export class FindUserByEmailService {
    async execute({ email }: IUser, req: Request, res: Response) {
        if (!email) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }
        try {
            const userExists = await prisma.user.findUnique({
                where: {
                    email: String(email),
                },
                include: {
                    tickets: true,
                },
            });

            console.log(userExists);

            if (!userExists) {
                return res.status(400).json({ message: 'Usuário não encontrado' });
            }

            return res.status(200).json(userExists);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
