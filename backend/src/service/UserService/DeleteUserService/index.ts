import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DeleteUserService {
    async execute(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ Message: 'Id não informado' });
        }
        try {
            await prisma.user.delete({
                where: {
                    id: Number(id),
                },
            });

            return res.status(200).json({ Message: 'Usuário deletado com sucesso' });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
