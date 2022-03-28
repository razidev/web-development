function enableCors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

module.exports = enableCors;
