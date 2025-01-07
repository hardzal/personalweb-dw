const Swal = require("sweetalert2");

function checkBox(data, value) {
  let check = data.split(",").map((x) => x.trim());
  return check.includes(value) ? `checked` : ``;
}

function flashMessage(message) {
  Swal.fire({
    title: "Message",
    text: message,
    icon: "success",
  });
}

module.exports = {
  checkBox,
  flashMessage,
};
