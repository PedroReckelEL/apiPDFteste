const express = require('express');

const app = express();
const port = 4001;

app.use(express.json());

const pdfLink = 'https://drive.google.com/file/d/1c5AN_0qgBE-k0-morvwxmPF_ATKqgT0P/view?usp=sharing';

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