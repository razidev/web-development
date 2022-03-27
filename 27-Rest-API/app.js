const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/quote', function (req, res) {
    res.status(200).json({ message: 'Hello World!' });
});

app.listen(3000);
