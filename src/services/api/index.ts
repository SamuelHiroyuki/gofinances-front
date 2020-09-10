import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3333',
});

export default http;
// Arquivo criado somente pra passar no teste. A estrutura que eu costumo usar é outra.
