function homeIndex(req, res) {
  res.render("index");
}

function blogPage(req, res) {
  res.render("blog");
}

function projectPage(req, res) {
  res.render("project");
}

function projectDetailPage(req, res) {
  res.render("project-detail");
}

function contactPage(req, res) {
  res.render("contact");
}

module.exports = {
  homeIndex,
  blogPage,
  contactPage,
  projectPage,
  projectDetailPage,
};
