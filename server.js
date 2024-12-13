const io = require("socket.io")(8080, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("send-id", socket.id);
  socket.on("join-room", (role) => {
    socket.join(role);
    console.log("Joined as an:", role);
  });
  socket.on("send", (message, room) => {
    if (!room || room === "") {
      socket.broadcast.emit("receive", message);
    } else {
      console.log(room);
      socket.to(room).emit("receive", message);
    }
  });
});
