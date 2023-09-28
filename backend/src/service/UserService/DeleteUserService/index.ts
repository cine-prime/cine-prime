import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteUserService {
  async execute( req: Request, res: Response) {
    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({ Message: "User deleted successfully" });
  }
}