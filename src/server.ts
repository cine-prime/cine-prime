import express from 'express';
import { routes } from './routes/routes';

const app = express();
const port = 3333;

app.use(express.json());

app.use(routes);

app.listen(port, () => {
    console.log(`Funcionando em http://localhost:${port}!`);
}
);