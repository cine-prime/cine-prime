import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FindAllEmployeeService {
  async execute(req: Request, res: Response) {
    try {
      let employees = await prisma.user.findMany({
        where: {
          profile: 'employee',
          isAdmin: false,
        }
      }) as any;

      if (employees.length === 0) {
        return res.json({ message: 'Não há funcionários cadastrados'} )
      }

      employees = employees.map((employee : any) => {
        const { password, ...rest } = employee
        return rest
      })

      return res.json(employees);

    } catch (error: any) {
      console.log('ERROR ->', error.message);
      return res.status(500).json({ message: error.message })
    }
  }
}
