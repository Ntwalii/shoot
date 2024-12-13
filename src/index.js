const socket = io("http://localhost:8080");

const div = document.getElementById("textsDiv");
const form = document.getElementById("form");
const joinRoomButton = document.getElementById("joinRoom");
const messageInput = document.getElementById("input");
const roleInput = document.getElementById("role");
const sendButton = document.getElementById("send");
sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("We here");
  socket.emit("send", messageInput.value, roleInput.value);
  displayMessage(messageInput.value, "sender");
  messageInput.value = "";
  roleInput.value = "";
});

joinRoomButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Before joining room, Socket ID:", socket.id);
  socket.emit("join-room", roleInput.value);
  console.log("After joining room, Socket ID:", socket.id);
});

const displayMessage = (message, userRole) => {
  const messageBox = document.createElement("div");
  messageBox.innerHTML = `
    <div class="p-2 rounded-lg  my-5 mx-3 ${
      userRole === "receiver"
        ? "bg-white text-[#3E3E3E]"
        : "border border-white text-white"
    }">
      <p>${message}</p>
    </div>`;
  div.appendChild(messageBox);
};
socket.on("receive", (message) => {
  displayMessage(message, "receiver");
});
socket.on("send-id", (id) => {
  console.log(id);
});
