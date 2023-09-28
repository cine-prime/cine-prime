import axios from "axios";

const backEndPort = import.meta.env.VITE_BACKEND_PORT;

export default axios.create({
  baseURL: `http://localhost:${backEndPort}`,
});

console.log(`Conectado com o back-end em: http://localhost:${backEndPort}`);
