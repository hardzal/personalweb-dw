const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.production);

/** Blog controllers */
async function blogPage(req, res) {
  const query = `SELECT * FROM public."Blogs"`;
  const link = req.originalUrl.split("/");

  try {
    const blogsData = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    res.render("blogs", {
      title: "Blog Page",
      data: blogsData,
      path: link[1],
    });
  } catch (error) {
    console.log(error);
    res.status(501).render("errorpage");
  }
}

function blogDetailPage(req, res) {
  let id = req.params.id;
  res.send("blog-detail");
}

async function blogAddPage(req, res) {
  res.send("blog-add");
}

async function blogAdd(req, res) {}

async function blogUpdatePage(req, res) {
  res.send("blog-edit");
}

async function blogUpdate(req, res) {}

async function blogDelete(req, res) {}

module.exports = {
  blogPage,
  blogDetailPage,
  blogAddPage,
  blogAdd,
  blogUpdatePage,
  blogUpdate,
  blogDelete,
};
