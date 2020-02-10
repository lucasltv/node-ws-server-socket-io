var customError = require('../../helpers/customError');

module.exports = {
    serverOnline: async function (req, res) {
        return res.send({ result: `SERVER ONLINE. PID: ${process.pid}`, error: false });
    }
}