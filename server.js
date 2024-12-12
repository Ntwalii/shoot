const io = require("socket.io")(8080, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("send", (message, room) => {
    if ((room = "")) {
      socket.broadcast.emit("receive", message);
    } else {
      socket.to(room).emit("receive", message);
    }
  });
});
