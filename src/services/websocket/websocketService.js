var customError = require('../../helpers/customError'),
    io, //Only for broadcasting (to all connected users)
    enumWebsocketEvents = require('../../enums/enumWebsocketEvents')

module.exports = {
    setSocketIoInstance: _io => io = _io,
    handleNewConnection: socket => {
        socket.on(enumWebsocketEvents.ESP_CONNECTED, async function (data) {
            console.log(`LOG: data`, data);
            socket.emit(enumWebsocketEvents.WS_RESPONSE, data);
        });

        socket.on(enumWebsocketEvents.WS_DISCONNECTED, async function (disconnect_msg) {
            console.log(`LOG: disconnect_msg`, disconnect_msg);
        });
    },
    ioMiddleware: async function (socket, next) {
        try {
            const { token = false } = socket.handshake.query
            // if (!token) return next(customError(`WS error: token is required!`, 403)); //FIXME:
            return next();
        } catch (err) {
            return next(customError(err.message, 500));
        }
    },
    broadcastEvent: function (event = 'messageReceived', data = {}) {
        io.emit(event, data);//TODO: validar se instancia de io é valida
        return true;
    },
}