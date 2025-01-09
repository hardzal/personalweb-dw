function checkBox(data, value) {
  let check = data.split(",").map((x) => x.trim());
  return check.includes(value) ? `checked` : ``;
}

function summaryDesc(desc) {
  return desc.substr(0, 100) + `...`;
}

function labelPost(labels) {
  const newLabels = labels.split(",");
  return newLabels.map((label) => `<span>${label}</span>`).join("");
}

function linkActive(link, path) {
  return link == path ? "link-active" : "";
}

module.exports = {
  checkBox,
  summaryDesc,
  labelPost,
  linkActive,
};
