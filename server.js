const io = require("socket.io")(8080, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", message);
  });
});
