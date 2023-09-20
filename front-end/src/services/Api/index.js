import axios from 'axios'

const backEndPort = process.env.REACT_APP_BACKEND_PORT

export default axios.create({
  baseURL: `http://localhost:${backEndPort}`
});

console.log(`Conectado com o back-end em: http://localhost:${backEndPort}`)

