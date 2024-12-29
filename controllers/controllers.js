const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);

async function homeIndex(req, res) {
  const query = `SELECT * FROM public."Projects"`;
  const projectsData = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  res.render("index", { data: projectsData });
}

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

async function projectPage(req, res) {
  const query = `SELECT * FROM public."Projects"`;
  const blogsData = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  res.render("project", {
    title: "Project list",
  });
}

async function projectAddPage(req, res) {
  res.send("");
}

async function projectAdd(req, res) {
  let title = req.body.title;
  let startDate = req.body.start_date;
  let endDate = req.body.end_date;
  let description = req.body.description;
  let technologies = req.body.technologies;
  let image = req.body.image;

  if (title == "" || startDate == "" || endDate == "" || description == "") {
    return alert("All input fields cannot be empty");
  }

  let post = {
    title,
    description,
    startDate,
    endDate,
    image,
    technologies,
  };

  console.log(post);
  try {
    const query = `INSERT INTO public."Projects" (title, description, technologies, start_date, end_date, image, "createdAt")
                VALUES
      ('${title}', '${description}', 
      '${technologies}', '${new Date(startDate).toISOString()}', 
      '${new Date(endDate).toISOString()}', '${image}', 
      '${new Date().toISOString()}')`;

    const project = await sequelize.query(query, {
      type: QueryTypes.INSERT,
    });

    res.send(`Berhasil! ${project}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function projectDetailPage(req, res) {
  res.render("project-detail");
}

async function projectUpdate(req, res) {}

async function projectDelete(req, res) {}

async function contactPage(req, res) {
  res.render("contact");
}

module.exports = {
  homeIndex,
  blogPage,
  blogDetailPage,
  blogAddPage,
  contactPage,
  projectPage,
  projectDetailPage,
  projectAddPage,
  projectAdd,
};
