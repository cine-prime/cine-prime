import express from 'express';
import { routes } from './routes/routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT;

app.use(express.json());

app.use((req: any, res: any, next: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return next()
});

app.use(routes);

app.listen(port, () => {
    console.log(`Funcionando em http://localhost:${port}`);
}
);