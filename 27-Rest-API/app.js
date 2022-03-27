const express = require('express');
const app = express();

const db = require('./data/database');
const quoteRoutes = require('./routes/quotes.routes');

app.use(express.urlencoded({ extended: false }));

app.use('/quotes', quoteRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message
    });
});

db.initDb().then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})
