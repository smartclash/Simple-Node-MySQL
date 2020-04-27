const express = require('express');
const mysql = require('mysql');

const app = express();
const connection = mysql.createConnection({
    // Since the host is default to localhost, we aren't specifying it.
    user: 'root',
    database: 'test'
});
connection.connect();

app.get('/', (req, res, args) => {
    res.json({
        message: 'Go to http://localhost:8080/save/enterEmail/enterName/enterPass'
    });
});
app.get('/save/:email/:name/:password', (req, res, args) => {
    const email = req.params.email;
    const name = req.params.name;
    const pass = req.params.password;

    connection.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
        [name, email, pass],
        (error, results, fields) => {
            res.json({message: 'Value saved. Now go to http://localhost:8080/show-all'});
        }
    );
});
app.get('/show-all', (req, res, args) => {
    connection.query('SELECT * FROM users', (error, results, fields) => {
        res.json(results);
    });
});

app.listen(8080, () => console.log('Listening on http://localhost:8080/'));
