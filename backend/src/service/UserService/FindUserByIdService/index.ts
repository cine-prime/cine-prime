import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Iuser {
    id: number;
}
export class FindUserByIdService {
    async execute({id}:Iuser,req: Request, res: Response ) {

      console.log(id);

        const userExists = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        console.log(userExists);

        return res.status(200).json(userExists);
    }
}