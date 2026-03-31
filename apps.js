console.log("Rodando arquivo");

const express = require('express');
const app = express();
const port = 3000;

// --------------------
// Middleware de aplicação: log de acesso
// --------------------
app.use((req, res, next) => {
    console.log(`[LOG] Acesso à rota: ${req.method} ${req.url}`);
    next();
});

// --------------------
// Rotas principais
// --------------------
app.get('/', (req, res) => {
    res.send('<h1>Página: Home</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>Página: About</h1>');
});

app.get('/data', (req, res) => {
    res.send('<h1>Página: Data</h1>');
});

// --------------------
// Router para /users
// --------------------
const usersRouter = express.Router();

// Rota principal /users
usersRouter.get('/', (req, res) => {
    res.send('<h1>Página: Users</h1>');
});

// Rotas fixas: signin e signup (devem vir antes da dinâmica)
usersRouter.get('/signin', (req, res) => {
    res.send('<h1>Página: Signin</h1>');
});

usersRouter.get('/signup', (req, res) => {
    res.send('<h1>Página: Signup</h1>');
});

// Rota dinâmica /users/:userid
usersRouter.get('/:userid', (req, res) => {
    const userid = req.params.userid;
    if (!userid) {
        return res.redirect('/users/signup');
    }
    res.send(`<h1>Bem-vindo, usuário ${userid}!</h1>`);
});

// Vincula o router a /users
app.use('/users', usersRouter);

// --------------------
// Middleware 404
// --------------------
app.use((req, res) => {
    res.status(404).send(`
        <h1>Erro 404 - Página não encontrada</h1>
        <p><a href="/">Voltar para o Index</a></p>
    `);
});

// --------------------
// Servidor
// --------------------
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});