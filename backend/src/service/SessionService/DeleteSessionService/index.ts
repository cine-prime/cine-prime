import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DeleteSessionService {
    async execute(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ Message: 'Id não informado' });
        }
        try {
            const session = await prisma.session.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (session) {
                await prisma.session.delete({
                    where: {
                        id: Number(id),
                    },
                });
            } else {
                return res.status(400).json({ Message: 'Sessão inexistente' });
            }

            return res.status(200).json({ Message: 'Sessão removida com sucesso!' });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
