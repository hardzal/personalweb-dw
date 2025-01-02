const swal = require("sweetalert2");

function checkBox(data, value) {
  let check = data.split(",").map((x) => x.trim());
  return check.includes(value) ? `checked` : ``;
}

async function flashMessage(message) {
  await swal.fire({
    title: "Message",
    text: message,
    icon: "success",
  });
}

module.exports = {
  checkBox,
  flashMessage,
};
