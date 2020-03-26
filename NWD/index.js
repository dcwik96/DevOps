const express = require('express');
const redis = require('redis');
const app = express();
const process = require('process');

const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

function nwd(a, b) {
    var tmp;
    while (b) {
        tmp = a%b;
        a=b;
        b=tmp;
    }
    return a;
}

app.get('/:number1/:number2', (req, resp) => {
    console.log('New request');
    const number1 = req.params.number1;
    const number2 = req.params.number2;
    const keyRedis = number1+':'+number2;

    var wynik = nwd(number1,number2)

    client.get(keyRedis, (err, valueRedis) => {
        if(valueRedis == null || valueRedis == undefined)
            valueRedis = nwd(number1, number2);
        resp.send('Najwiekszy wspolny dzielnik dla ' + number1 + ' oraz ' + number2 + ' wynosi: ' + valueRedis);
        client.set(keyRedis, parseInt(valueRedis));
    });
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
