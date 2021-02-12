if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const db = require('../db/memes')
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
    }
    else {
      next();
    }});

app.get('/memes', async (req, res) => {
    const memes = await db.getAllMemes();
    res.status(200).json({ memes });

})

app.post('/memes', async (req, res) => {
    const result = await db.createMeme(req.body);
    res.status(201).json({id: result[0]});
    res.redirect('back');
})

app.get('/memes/:id', async (req, res) => {
    const meme = await db.getOneMeme(req.params.id);
    res.status(200).json({ meme });

})

app.get('*', (req, res) => {
    res.status(404).json({"result": "Not found"});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})