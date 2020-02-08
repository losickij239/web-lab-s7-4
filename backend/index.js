require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

const conn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
}).promise();

app.get('/', (req, res) => {
    res.send('Backend is OK');
});

app.get('/weather', (req, res) => {
    console.log(req.query.city);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(req.query.city)}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=ru`)
        .then((response => response.json()))
        .then((text) => res.status(text.cod).send(text))
        .catch((e) => res.send(`Получена ошибка ${e.toString()}`));

});

app.get('/weather/coordinates', (req, res) => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=ru`)
        .then((response => response.json()))
        .then((text) => res.status(text.cod).send(text))
        .catch((e) => res.send(`Получена ошибка ${e.toString()}`));
});

app.get('/favourites', (req, res) => {
    conn.query("SELECT * FROM cities")
        .then(result => {
            res.send(result[0]);
        })
        .catch((e) => res.status(500).send(e));
});

app.post('/favourites', (req, res) => {
    console.log();
    conn.execute('insert into `cities` (`name`) VALUES (?)', [req.body.city])
        .then(() => res.send("200 OK POSTED"))
        .catch((e) => res.status(500).send({"error":e}))
});

app.delete('/favourites', (req, res) => {
    console.log();
    conn.execute('delete from `cities` WHERE `name` = ?', [req.body.city])
        .then(() => res.send("200 OK DELETED"))
        .catch((e) => res.status(500).send({"error":e}))
});

app.listen(port, () => console.log('Слушаю порт ', port));