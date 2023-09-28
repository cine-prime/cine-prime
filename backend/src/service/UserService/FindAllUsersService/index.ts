import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ListarUsersService {
    async execute(_req: Request, res: Response){
        const users = await prisma.user.findMany();

        return res.json(users);
    }
}