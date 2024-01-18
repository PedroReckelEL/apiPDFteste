const express = require('express');

const app = express();
const port = 4001;

app.use(express.json());

const pdfLink = 'https://www.seiinteligencia.com.br/grupo-sei-politica-de-privacidade-lgpd.pdf';

app.get('/pdfDoc', (req, res) => {
    res.json({title: "Segue o link do PDF:", link: pdfLink});
})

app.post('/pdfDoc', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    res.json({name: name, email: email, link: pdfLink})
})

app.listen(port, () => {
    console.log(`Backend rodando na porta ${port}`);
})