const express = require('express');
const Usuario = require('./models/Usuario');
const sequelize = require('./conf/sequelize');

const app = express();
const port = 4001;

app.use(express.json());

const pdfLink = 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf';

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso!');
        await sequelize.sync(); // Isso sincroniza os modelos com o banco de dados
        console.log('Modelos sincronizados com o banco de dados');
    } catch (error) {
        console.log('Error ao conectar ao banco  de dados:', error);
    }
})();

app.post('/findUser', async (req, res) => {
    try {

        console.log('Requisição recebida:', req.body);

        const email = req.body.email;

        if (!email) {
            return res.status(400).json({ error: 'E-mail não fornecido.' });
        }

        const usuario = await Usuario.findAll({
            where: {
                email: email
            }
        });

        if(usuario && usuario.length > 0) {
            res.json({
                message: 'Usuário retornado',
                user: usuario[0].toJSON(),
                link: pdfLink
            });
        } else {
            res.json({
                message: 'Nenhuma usuário encontrado.'
            });
        }
    } catch(error) {
        console.error('Error ao buscar o usuário', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
})

app.get('/pdfDoc', (req, res) => {
    res.json({title: "Segue o link do PDF:", link: pdfLink});
})

app.post('/pdfDoc', async (req, res) => {
    const { name, email } = req.body;

    try {
        const usuario = await Usuario.create({ name, email });
        console.log('Usuário criado: ', usuario.toJSON());

        res.json({ name, email, link: pdfLink });
    } catch(error) {
        console.error('Error ao criar usuário', error);
        res.status(500).json({error: 'Erro interno no servidor'});
    } 
});

app.listen(port, () => {
    console.log(`Backend rodando na porta ${port}`);
})