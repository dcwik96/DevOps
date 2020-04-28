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
pgClient.query('CREATE TABLE IF NOT EXISTS silnia(liczba INT, wynik INT)').catch(err => console.log(err));

console.log(keys);

app.get('/', (req, resp) => {
    resp.send('Hello from my backenad');
})

app.listen(4000, err => {
    console.log("Server listening on 4000")
});