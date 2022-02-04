import express from 'express';
import UserController from "./controllers/UserController";
import UserDao from "./daos/UserDaos";
import bodyParser from "body-parser";
import TuitController from "./controllers/TuitController";
import TuitDao from "./daos/TuitDaos";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tuiter');

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})

const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());

const PORT = 4000;
app.listen(process.env.PORT || PORT);