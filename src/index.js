const socket = io("http://localhost:8080");

const div = document.getElementById("textsDiv");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("input");
  socket.emit("send", input.value);
  displayMessage(input.value, "sender");
  input.value = "";
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
