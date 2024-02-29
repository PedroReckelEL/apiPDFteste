const express = require('express');
const User = require('./models/User');
const Service = require('./models/Services')
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
        console.log('Error ao conectar ao banco de dados:', error);
    }
})();

app.post('/findUser', async (req, res) => {
    try {

        const email = req.body.email;

        if (!email) {
            return res.status(400).json({ error: 'E-mail não fornecido.' });
        }

        const user = await User.findAll({
            where: {
                email: email
            }
        });

        if(user && user.length > 0) {

            res.json({
                message: 'Usuário retornado',
                user: user[0],
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

app.post('/signin', async (req, res) => {
    const { username, email, phone } = req.body;

    try {
        const user = await User.create({ username, email, phone });
        console.log('Usuário criado: ', user.toJSON());

        res.json({ username, email, phone});
    } catch(error) {
        console.error('Error ao criar usuário', error);
        res.status(500).json({error: 'Erro interno no servidor'});
    } 
});

app.post('/services', async (req, res) => {
    try {
        const { service_name } = req.body;

        if (!service_name) {
            return res.status(400).json({ error: 'Nome não fornecido.' });
        }

        const service = await Service.create({ service_name });
        console.log('Serviço criado: ', service.toJSON());

        res.json({title: 'Serviço criado:', service: { service_name }});
    } catch(error) {
        console.log('Error ao criar serviço', error);
        res.status(500).json({error: 'Erro interno no servidor'});
    }

});

app.post('/servicesbyid', async (req, res) => {
    const service_id = req.body.service_id;

    try {
        const service = await Service.findAll({
            where: {
                id: service_id
            }
        });

        if(service && service.length > 0) {
            res.json({
                message: 'Serviço retornado',
                service: service[0],
                link: pdfLink
            });
        } else {
            res.json({
                message: 'Nenhum serviço encontrado.'
            });
        }
    } catch(error) {
        console.error('Error ao buscar os serviços', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(port, () => {
    console.log(`Backend rodando na porta ${port}`);
});