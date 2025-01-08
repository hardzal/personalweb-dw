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

function summaryDesc(desc) {
  return desc.substr(0, 100) + `...`;
}

module.exports = {
  checkBox,
  flashMessage,
  summaryDesc,
};
