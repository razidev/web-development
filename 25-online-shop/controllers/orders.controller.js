const stripe = require('stripe')('pk_test_51KgWmuDkaeBUX0E6P2JkNz2NS4d7h5imFxUXaruN9AlFCPYYVVq7FiqukEOF6unmZ9XQ0ka4IHj0NZP9vybrwz2y0009c1DZAy')
const Order = require('../models/order.model');
const User = require('../models/user.model');

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render('customer/orders/all-orders', {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: 'idr',
          product_data: {
            name: 'Dummy',
          },
          unit_amount_decimal: 13000000
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `localhost:3000/orders/success`,
    cancel_url: `localhost:3000/orders/failure`,
  });

  res.redirect(303, session.url);
}

function getSuccess(params) {
  res.render('customer/orders/success')
}

function getFailure(params) {
  res.render('customer/orders/failure')
}

module.exports = {
  addOrder, getOrders,
  getSuccess, getFailure
};