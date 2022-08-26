const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({extended: false})); //for parsing form data

app.get('/', (req, res) => {
    res.send('<form action="/store-user" method="POST"><label>Your Name: </label><input type="text" name="username"/><button type="submit">Submit</button></form>')
});

app.post('/store-user', (req, res) => {
    const userName = req.body.username;
    const filePath = path.join(__dirname, 'data', 'storage.json');
    const fileData = fs.readFileSync(filePath);
    const existingUser = JSON.parse(fileData);
    existingUser.push(userName);
    fs.writeFileSync(filePath, JSON.stringify(existingUser));
    res.send('<h1>data stored</h1>');
});

app.get('/users', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'storage.json');
    const fileData = fs.readFileSync(filePath);
    const existingUser = JSON.parse(fileData);

    let responseData = '<ul>';
    for (const user of existingUser) {
        responseData += '<li>' + user + '</li>';
    }
    responseData += '</ul>';
    res.send(responseData);
})

app.listen(3000)