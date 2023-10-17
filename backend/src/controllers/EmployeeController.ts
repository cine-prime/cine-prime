import { Request, Response } from "express";

import { CreateEmployeeService } from "../service/EmployeeService/CreateEmployeeService/index";
import { DeleteEmployeeService } from "../service/EmployeeService//DeleteCreateEmployeeService/index";
import { FindAllEmployeeService } from "../service/EmployeeService/findAllEmployeeService/index";
import { UpdateEmployeeService } from "../service/EmployeeService/UpdateEmployeeService/index";
import { FindByIdEmployeeService } from "../service/EmployeeService/findEmployeeByIdService/index";

interface IEmployee {
  email: string;
  nome: string;
  cpf: string;
  telefone: string;
  password?: string;
}

export class EmployeeController {
  async store(req: Request, res: Response) {
    const createEmployeeService = new CreateEmployeeService();

    const employee = await createEmployeeService.execute(
      req,
      res
    );

    return employee;
  }

  async index(req: Request, res: Response) {
    const findAllEmployeeService = new FindAllEmployeeService();

    const employee = await findAllEmployeeService.execute(
      req,
      res
    );

    return employee;
  }

  async find(req: Request, res: Response) {
    const findByIdEmployeeService = new FindByIdEmployeeService();

    const employee = await findByIdEmployeeService.execute(
      req,
      res
    );

    return employee;
  }

  async update(req: Request, res: Response) {
    const updateEmployeeService = new UpdateEmployeeService();

    const employee = await updateEmployeeService.execute(
      req,
      res
    );

    return employee;
  }

  async delete(req: Request, res: Response) {
    const deleteEmployeeService = new DeleteEmployeeService();

    const employee = await deleteEmployeeService.execute(
      req,
      res
    );

    return employee;
  }
}
