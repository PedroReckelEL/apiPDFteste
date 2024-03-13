const express = require('express');
const User = require('./models/User');
const Service = require('./models/Services');
const TypeUser = require('./models/TypeUser');
const UserInstace = require('./models/UserInstace');
const sequelize = require('./conf/sequelize');

const app = express();
const port = 4001;

app.use(express.json());

const pdfLink = 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf';

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso!');
        await sequelize.sync({ alter: true }); // Isso sincroniza os modelos com o banco de dados // O alter força as alterações no esquema
        console.log('Modelos sincronizados com o banco de dados');
    } catch (error) {
        console.log('Error ao conectar ao banco de dados:', error);
    }
})();

app.get('/pdfDoc', (req, res) => {
    res.json({title: "Segue o link do PDF:", link: pdfLink});
})

app.post('/findUser', async (req, res) => {
    try {

        const phone = req.body.phone;

        if (!phone) {
            return res.status(400).json({ error: 'Número não fornecido.' });
        }

        const user = await User.findAll({
            where: {
                phone: phone
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

app.post('/signin', async (req, res) => {
    const { username, phone, state } = req.body;

    try {
        const user = await User.create({ username, phone, state });
        console.log('Usuário criado: ', user.toJSON());

        res.json({ username, phone, state});
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

app.get('/services', async (req, res) => {
    try {
        const services = await Service.findAll();

        if(services && services.length > 0) {
            res.json({
                message: 'Serviços retornados',
                services: services,
            })
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

app.post('/servicesbyid', async (req, res) => {
    try {
        const service_id = req.body.service_id;

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
        console.error('Error ao buscar o serviço', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/typeUser', async (req, res) => {
    try {
        const { type_user } = req.body;

        if (!type_user) {
            return res.status(400).json({ error: 'Nome não fornecido.' });
        }

        const type = await TypeUser.create({ type_user });
        console.log('Tipo criado: ', type.toJSON());

        res.json({title: 'Tipo criado:', service: { type_user }});
    } catch(error) {
        console.log('Error ao criar o tipo', error);
        res.status(500).json({error: 'Erro interno no servidor'});
    }
})

app.get('/typeUser', async (req, res) => {
    try {
        const types = await TypeUser.findAll();

        if(types && types.length > 0) {
            res.json({
                message: 'Tipos de usuário retornado',
                types: types,
            })
        } else {
            res.json({
                message: 'Nenhum serviço encontrado.'
            });
        }

    } catch(error) {
        console.error('Error ao buscar os tipos', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/createUserInstace', async (req, res) => {
    const { remoteJid, pushName, instanceName } = req.body;

    try {
        const userInstace = await UserInstace.create({ remoteJid, pushName, instanceName });
        console.log('Usuário criado: ', userInstace.toJSON());

        res.json({ remoteJid, pushName, instanceName});
    } catch(error) {
        console.error('Error ao criar instâcia de usuário', error);
        res.status(500).json({error: 'Erro interno no servidor'});
    } 
});

app.post('/findUserInstace', async (req, res) => {
    try {

        const remoteJid = req.body.remoteJid;

        if (!remoteJid) {
            return res.status(400).json({ error: 'Número não fornecido.' });
        }

        const userInstace = await UserInstace.findAll({
            where: {
                remoteJid: remoteJid
            }
        });

        if(userInstace && userInstace.length > 0) {

            res.json({
                message: 'Usuário retornado',
                userInstace: userInstace[0],
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


app.listen(port, () => {
    console.log(`Backend rodando na porta ${port}`);
});