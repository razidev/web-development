const express = require('express');
const path = require('path');
const app = express();

const authRoutes = require('./routes/auth.routes');

app.set('view engine', 'ejs');//to activate rendering views using ejs
app.set('views', path.join(__dirname, 'views'));//to set the path to the views folder

app.use(express.static('public'));

app.use(authRoutes);

app.listen(3000);