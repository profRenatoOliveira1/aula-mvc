import express from 'express';
import cors from 'cors';

// definindo a porta do servidor
const port: number = 3333;

// criando servidor web
const server = express();
server.use(cors());
server.use(express.json());

// rotas da aplicação
server.get('/', (req, res) => {
    res.json({ mensagem: "Olá mundo, está é minha primeira aplicação web"});
});

server.get('/pessoas', (req, res) => {
    res.json({ mensagem: "Aqui será apresentado os dados das pessoas."});
});

// iniciando o servidor
server.listen(port, () => {
    console.log(`Servidor iniciado no endereço http://localhost:${port}`);
});