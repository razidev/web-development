const Quote = require('../models/quote.model');

async function getRandomQuote(req, res, next) {
    try {
        const randomQuote = await Quote.getRandomQuote();
        res.json({
            quote:randomQuote
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getRandomQuote };
