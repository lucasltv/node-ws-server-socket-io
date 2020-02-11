var customError = require('../../helpers/customError'),
    io, //Only for broadcasting (to all connected users)
    enumWebsocketEvents = require('../../enums/enumWebsocketEvents')

module.exports = {
    setSocketIoInstance: _io => io = _io,
    handleNewConnection: socket => {
        const { handshake } = socket;
        socket.on("WEB_EVENT", function (data) {
            socket.emit(enumWebsocketEvents.WS_RESPONSE, data);
        });

        if (!handshake.query.device || handshake.query.device !== "WEB") io.emit(enumWebsocketEvents.ESP_CONNECTED);
        // socket.on(enumWebsocketEvents.ESP_CONNECTED, function (data) {
        //     console.log(`LOG: data ESP_CONNECTED`, data);
        // });
        socket.on(enumWebsocketEvents.ESP_EVENT, function (data) {
            io.emit(enumWebsocketEvents.ESP_EVENT, data);
        });

        socket.on(enumWebsocketEvents.WS_DISCONNECTED, function (disconnect_msg) {
            if (disconnect_msg === "ping timeout") io.emit(enumWebsocketEvents.ESP_DISCONNECTED); //TODO: se é ESP
        });
    },
    ioMiddleware: function (socket, next) {
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