import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';

const employeeController = new EmployeeController();

const routesEmployee = Router();

routesEmployee.post('/', employeeController.store)
routesEmployee.get('/', employeeController.index)
routesEmployee.get('/:id', employeeController.find)
routesEmployee.put('/:id', employeeController.update)
routesEmployee.delete('/:id', employeeController.delete)

export default routesEmployee;