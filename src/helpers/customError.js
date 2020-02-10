var httpErrors = require('http-errors');

module.exports = function (message = "Resource not found!", code = 404) {
    let error;
    try {
        error = new httpErrors[code](message);
        error.code = code;
    } catch (err) {
        error = new SyntaxError(`Invalid HTTP code: ${code}`);
        error.code = 500;
    }
    return error;
}