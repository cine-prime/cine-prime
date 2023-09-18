import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IUser {
  email: string;
}

export class FindUserByEmailService {
  async execute({ email }: IUser, req: Request, res: Response) {

    console.log(email);

    const userExists = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    });

    console.log(userExists);

    if (!userExists) {
      return res.status(400).json({ error: email });
    }

    return res.json(userExists);
  }
}