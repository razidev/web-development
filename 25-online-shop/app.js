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
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');
const ordersRoutes = require('./routes/orders.routes');

app.set('view engine', 'ejs');//to activate rendering views using ejs
app.set('views', path.join(__dirname, 'views'));//to set the path to the views folder

app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(expressSession(sessionConfig));

app.use(csrf());
app.use(cartMiddleware);
app.use(csrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart', cartRoutes);
app.use(protectRoutesMiddleware);
app.use('/orders', ordersRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase().then(() => {
    console.info('app is running on port 3000');
    app.listen(3000);
}).catch(err => {
    console.log('Failed to connect to database', err);
})