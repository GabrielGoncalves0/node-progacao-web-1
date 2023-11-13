import express from 'express';

//exemplo de importação de biblioteca usando: 'commanjs'
//express = requite('express');

const porta = 3000;
const host = '0.0.0.0';
var listaUsuarios = [];

function processaCadastroUsuario(req, res) {
    //processar os parâmetros da url
    const usuario = {
        nome: req.query.nome,
        sobreNome: req.query.sobreNome,
        telefone: req.query.telefone,
        email: req.query.email,
        rua: req.query.rua,
        bairro: req.query.bairro,
        numero: req.query.numero,
        cep: req.query.cep
    }
    //adiciona um usuario na lista
    listaUsuarios.push(usuario);

    //retorna a lista de usuários
    let conteudoResposta = `
        <!DOCTYPE html>
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Menu do Sistema</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body>
                <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                            <th>Nome</th>
                            <th>Sobre nome</th>
                            <th>Telefone</th>
                            <th>E-mail</th>
                            <th>Rua</th>
                            <th>Bairro</th>
                            <th>Numero</th>
                            <th>Cep</th>
                            </tr>
                        </thead>
                    <tbody> `;

    for(const usuario of listaUsuarios) {
        conteudoResposta += `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.sobreNome}</td>
                <td>${usuario.telefone}</td>
                <td>${usuario.email}</td>
                <td>${usuario.rua}</td>
                <td>${usuario.bairro}</td>
                <td>${usuario.numero}</td>
                <td>${usuario.cep}</td>
            </tr>
        `;
    }

    conteudoResposta += `
                    </tbody>
                </table>
                <a class="btn btn-primary" href="/" role="button">Voltar ao Menu</a>
                <a class="btn btn-primary" href="/cadastrarUsuario.html" role="button">Continuar Cadastrando</a>
            </body>
            <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </html>
    `;
    res.end(conteudoResposta);
}

const app = express();

//indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'.
app.use(express.static('./paginas'));

app.get('/', (req, res) => {
    res.end(`
        <!DOCTYPE html>
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Menu do Sistema</title>
            </head>
            <body>
                <h1>Menu</h1>
                <ul>
                    <li><a href="/cadastrarUsuario.html">Cadastrar Usuário</li>
                </ul>
            </body>
        </html>
    `);
});

//rota para processar o cadastro de usuários endpoint = '/cadastrarUsuario'

app.get('/cadastrarUsuario', processaCadastroUsuario);


app.listen(porta, host, () => {
    console.log(`servidor executando na URL http://${host}:${porta}`);
});