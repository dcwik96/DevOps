const keys = require('./keys');

const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());

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
pgClient.on('error', () => console.log('No connection to  PG DB'));
pgClient.query('CREATE TABLE IF NOT EXISTS silnia(liczba INT, wynik BIGINT)').catch(err => console.log(err));

console.log(keys);


function silnia(n) {
    if ((n == 0) || (n == 1))
        return 1
    else {
        var result = (n * silnia(n - 1));
        return result
    }
}

app.get('/', (req, resp) => {
    resp.send('Hello from my backend');
})

app.post('/', (req, resp) => {
    console.log('Wywołano enpoint /number. Licze silnie dla ' + req.body.number);

    const number = req.body.number;

    redisClient.get(number, (err, valueRedis) => {
        if (valueRedis == null || valueRedis == undefined) {
            valueRedis = silnia(number);
            redisClient.set(number, parseInt(valueRedis));
            pgClient
                .query('INSERT INTO silnia (liczba, wynik) VALUES ($1, $2)', [number, valueRedis])
                .catch(err => console.log(err));
        }

        resp.status(200).json({ liczba: number, wynik: valueRedis });
    })
})

app.get('/result', (req, resp) => {
    console.log('Wywolano endpoint /result. Pobieram rezultaty z Postgres');

    pgClient.query('SELECT * FROM silnia ORDER BY liczba', (err, results) => {
        if (err) {
            throw err;
        }

        resp.status(200).json(results.rows);
    })
});

app.listen(4000, err => {
    console.log("Server listening on 4000")
});