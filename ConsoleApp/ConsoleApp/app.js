var net = require("net");
var CommandHandler = require("./CommandHandler.js");
var server = net.createServer();
server.on("connection", function (socket) {
    socket.on("data", function (d) {
        var returnMessage = "yup ok - no message";
        try {
            var parsedInput = CommandHandler.validateJSON(d);
            returnMessage = CommandHandler.execute(parsedInput);
        }
        catch (e) {
            returnMessage = e.message;
        }
        socket.write(returnMessage);
    });
    socket.on("close", function () {
        console.log("Connection closed");
    });
});
server.listen(9000, function () {
    console.log("listening");
});
//# sourceMappingURL=app.js.map