import { Router } from 'express';
import { AuthController } from '../controllers/LoginController';

const authController = new AuthController();

const routesAuth = Router();

routesAuth.post('/', authController.execute)
 
export default routesAuth;