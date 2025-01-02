/** Blog controllers */
async function blogPage(req, res) {
  const query = `SELECT * FROM public."Blogs"`;
  const blogsData = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  res.render("blog", {
    title: "Blog Page",
    data: blogsData,
  });
}

function blogDetailPage(req, res) {
  let id = req.params.id;
  res.send("blog-detail");
}

async function blogAddPage(req, res) {
  res.send("");
}

async function blogAdd(req, res) {}

async function blogUpdatePage(req, res) {}

async function blogUpdate(req, res) {}

async function blogDelete(req, res) {}
