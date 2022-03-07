const express = require('express');
const path = require('path');
const csrf = require('csurf');
const app = express();
const expressSession = require('express-session');
const createSessionConfig = require('./config/session');
const sessionConfig = createSessionConfig();
const db = require('./data/database');
const csrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const authRoutes = require('./routes/auth.routes');

app.set('view engine', 'ejs');//to activate rendering views using ejs
app.set('views', path.join(__dirname, 'views'));//to set the path to the views folder

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(expressSession(sessionConfig));

app.use(csrf());
app.use(csrfTokenMiddleware);

app.use(authRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase().then(() => {
    console.info('app is running on port 3000');
    app.listen(3000);
}).catch(err => {
    console.log('Failed to connect to database', err);
})