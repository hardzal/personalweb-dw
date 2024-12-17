function homeIndex(res, req) {
  res.render("index");
}

function blogPage(res, req) {
  res.render("blog");
}

function projectPage(res, req) {
  res.render("project");
}

function projectDetailPage(res, req) {
  res.render("project-detail");
}

function contactPage(res, req) {
  res.render("contact");
}

module.exports = {
  homeIndex,
  blogPage,
  contactPage,
  projectPage,
  projectDetailPage,
};
