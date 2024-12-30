function checkBox(data, value) {
  let check = data.split(",").map((x) => x.trim());
  return check.includes(value) ? `checked` : ``;
}

module.exports = {
  checkBox,
};
