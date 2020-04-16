const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort
});

const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on('error', () => console.log('No connection to PG DB'));

pgClient.query('CREATE TABLE IF NOT EXISTS results(number INT)').catch(err => console.log(err));

console.log(keys);

app.get('/', (req, resp) => {
    resp.send("Hello world!");
});

app.listen(8080, err => {
    console.log('Server listening on port 8080');
})


function nwd(a, b) {
    var tmp;
    while (b) {
        tmp = a % b;
        a = b;
        b = tmp;
    }
    return a;
}

app.get('/:number1/:number2', (req, resp) => {
    console.log('Najwiekszy wspolny dzielnik - szukam');
    const number1 = req.params.number1;
    const number2 = req.params.number2;
    const keyRedis = number1 + ':' + number2;

    redisClient.get(keyRedis, (err, valueRedis) => {
        if (valueRedis == null || valueRedis == undefined) {
            valueRedis = nwd(number1, number2);
            redisClient.set(keyRedis, parseInt(valueRedis));
            pgClient.query('INSERT INTO results (number) VALUES ($1)', [valueRedis]).catch(err => console.log(err));
        }
        resp.send('Najwiekszy wspolny dzielnik dla ' + number1 + ' oraz ' + number2 + ' wynosi: ' + valueRedis);
    });
});

app.get('/results', (req, resp) => {
    console.log('Wszystkie rezultaty z bazy postgres');

    const res = null;
    pgClient.query('SELECT number FROM results', (error, results) => {
        if (error) {
            throw error
        }
        resp.status(200).json(results.rows)
    })
});
