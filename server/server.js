const express = require('express');
let bodyParser = require('body-parser');

const app = express();

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes to here
let equationsHistory = [
    {
        num1: 1,
        opperation: '*',
        num2: 2,
        answer: 2
    },
    {
        num1: 42,
        opperation: '/',
        num2: 6,
        answer: 7
    }
];

app.get('/equation', (req, res) => {
    res.send(equationsHistory);
})

app.post('/equation', (req, res) => {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let opperation = req.body.opperation;  // string

    let answer = '';
    if (opperation === '+') {
        answer = num1 + num2;
    } else if (opperation === '-') {
        answer = num1 - num2;
    } else if (opperation === '*') {
        answer = num1 * num2;
    } else if (opperation === '/') {
        answer = num1 / num2;
    }

    let equation = {
        num1: num1,
        opperation: opperation,
        num2, num2,
        answer, answer
    }

    equationsHistory.push(equation);

    res.sendStatus(201);
})

app.listen(5000, function () {
    console.log(`You started the server! It is running on port 5000.`);
})

// normal function!
// function myFunction(req, res) {
//     console.log('GET /equation request received!');
//     res.send('GET /equation response');
// }

// same function as an annonymous arrow function!
// We tend to use annon. as callback functions.
// They don't need a name, because we don't reuse them!
// (req, res) => {
//     console.log('GET /equation request received!');
//     res.send('GET /equation response');
// }
