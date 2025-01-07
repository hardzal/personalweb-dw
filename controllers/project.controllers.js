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

/** projectpage controllers */

async function projectPage(req, res) {
  const query = `SELECT * FROM public."Projects"`;
  try {
    const projectsData = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    res.render("project", {
      title: "Project list",
      data: projectsData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function projectDetailPage(req, res) {
  res.render("project-detail");
}

async function projectAddPage(req, res) {
  res.send("project-add");
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

    // res.send(`Berhasil! ${project}`);
    req.flash("success", "Berhasil menambahkan data!");

    res.redirect("/projects");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function projectUpdatePage(req, res) {
  // const query = `SELECT * FROM public."Projects" WHERE id = '${req.params.id}'`;
  const query = `SELECT * FROM public."Projects" WHERE id = :id`;
  try {
    const projectData = await sequelize.query(query, {
      replacements: { id: req.params.id },
      type: QueryTypes.SELECT,
    });

    if (projectData.length === 0) {
      return res.status(404).send("Project not found");
    }

    console.log("Data: ", projectData);
    res.render("project-edit", {
      data: projectData[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function projectUpdate(req, res) {
  let title = req.body.title;
  let startDate = new Date(req.body.start_date).toISOString();
  let endDate = new Date(req.body.end_date).toISOString();
  let description = req.body.description;
  let technologies = req.body.technologies;
  let image = req.body.image;

  let id_project = req.body.id;

  if (title == "" || startDate == "" || endDate == "" || description == "") {
    return alert("All input fields cannot be empty");
  }

  try {
    const query = `UPDATE public."Projects" SET 
                    title = '${title}',
                    description = '${description}',
                    start_date = '${startDate}',
                    technologies = '${technologies}',
                    end_date = '${endDate}',
                    image = '${image}',
                    "updatedAt" = '${new Date().toISOString()}'
                  WHERE id = '${id_project}'              
    `;
    const project = await sequelize.query(query, {
      type: QueryTypes.UPDATE,
    });

    req.flash("success", "Berhasil memperbaharui data!");

    res.redirect("/projects");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function projectDelete(req, res) {
  const query = `DELETE FROM public."Projects" WHERE id = '${req.body.id}'`;
  try {
    const project = await sequelize.query(query, {
      type: QueryTypes.DELETE,
    });

    // res.send(`Berhasil menghapus data! ${project}`);
    res.redirect("/projects");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function contactPage(req, res) {
  res.render("contact");
}

module.exports = {
  homeIndex,
  contactPage,
  projectPage,
  projectDetailPage,
  projectAddPage,
  projectAdd,
  projectUpdatePage,
  projectUpdate,
  projectDelete,
};
