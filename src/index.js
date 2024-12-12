const socket = io("http://localhost:8080");

const div = document.getElementById("textsDiv");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const messageInput = document.getElementById("input");
  const roleInput = document.getElementById("role");
  socket.emit("send", messageInput.value, roleInput.value);
  displayMessage(messageInput.value, "sender");
  messageInput.value = "";
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
