const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);
const fs = require("fs");

/** projectpage controllers */

async function projectPage(req, res) {
  const query = `SELECT u.username, p.* FROM public."Projects" p INNER JOIN public."Users" u ON p.user_id=u.id`;
  // mengecek apakah ada user session
  const userSession = req.session.user ?? null;
  const link = req.originalUrl.split("/");

  try {
    const projectsData = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return res.render("project", {
      title: "Project list",
      data: projectsData,
      userSession: userSession,
      path: link[1],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function projectDetailPage(req, res) {
  const userSession = req.session.user ?? null;
  const id = req.params.id ?? null;

  const link = req.originalUrl.split("/");

  console.log(link);
  if (id == null) {
    req.flash("error", "Projek tidak ada.");
    return res.redirect("/projects");
  }
  const query = `SELECT * FROM public."Projects"
     WHERE id = :id`;

  try {
    const data = await sequelize.query(query, {
      replacements: {
        id: id,
      },
      type: QueryTypes.SELECT,
    });

    return res.render("project-detail", {
      userSession: userSession,
      data: data[0],
      path: link[1],
    });
  } catch (error) {}
}

async function projectAddPage(req, res) {
  const userSession = req.session.user ?? null;

  if (userSession === null) {
    return res.status(401).send("Halaman tidak bisa diakses.");
  }

  return res.render("project-add", {
    userSession: userSession,
  });
}

async function projectAdd(req, res) {
  const userSession = req.session.user ?? null;

  if (userSession === null) {
    return res.status(403).send("Halaman tidak bisa diakses.");
  }

  let title = req.body.title;
  let startDate = req.body.start_date;
  let endDate = req.body.end_date;
  let description = req.body.description;
  let technologies = req.body.technologies;
  let image = req.file.path;
  let user_id = req.body.user_id;

  if (title == "" || startDate == "" || endDate == "" || description == "") {
    return alert("All input fields cannot be empty");
  }

  try {
    const query = `INSERT INTO public."Projects" (title, description, technologies, start_date, end_date, image, user_id, "createdAt")
                VALUES
      ('${title}', '${description}', 
      '${technologies}', '${new Date(startDate).toISOString()}', 
      '${new Date(endDate).toISOString()}', '${image}', 
      '${user_id}',
      '${new Date().toISOString()}')`;

    const project = await sequelize.query(query, {
      type: QueryTypes.INSERT,
    });

    if (project) {
      req.flash("success", "Berhasil menambahkan data!");

      return res.redirect("/projects");
    }

    req.flash("success", "Gagal menambahkan data!");

    return res.redirect("/projects");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function projectUpdatePage(req, res) {
  const userSession = req.session.user ?? null;

  if (userSession === null) {
    return res.status(403).send("Halaman tidak bisa diakses.");
  }

  const query = `SELECT * FROM public."Projects" WHERE id = :id`;
  try {
    const projectData = await sequelize.query(query, {
      replacements: { id: req.params.id },
      type: QueryTypes.SELECT,
    });

    if (projectData.length === 0) {
      return res.status(404).send("Project not found");
    }

    if (userSession.id !== projectData[0].user_id) {
      return res.status(403).send("Project unauthorized");
    }

    console.log("Data: ", projectData);
    res.render("project-edit", {
      data: projectData[0],
      userSession: userSession,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function projectUpdate(req, res) {
  const userSession = req.session.user ?? null;

  if (userSession === null) {
    return res.status(403).send("Halaman tidak bisa diakses.");
  }

  let title = req.body.title;
  let startDate = new Date(req.body.start_date).toISOString();
  let endDate = new Date(req.body.end_date).toISOString();
  let description = req.body.description;
  let technologies = req.body.technologies;
  let image = req.file.path;

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
                  WHERE id = :id              
    `;
    const project = await sequelize.query(query, {
      type: QueryTypes.UPDATE,
      replacements: {
        id: id_project,
      },
    });

    req.flash("success", "Berhasil memperbaharui data!");

    res.redirect("/projects");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function projectDelete(req, res) {
  const image = req.body.image ?? null;
  if (image != null) {
    fs.unlinkSync(image);
  }

  const query = `DELETE FROM public."Projects" WHERE id = :id`;
  try {
    const project = await sequelize.query(query, {
      type: QueryTypes.DELETE,
      replacements: {
        id: req.body.id,
      },
    });

    req.flash("success", `Berhasil menghapus data! ${project}`);
    return res.redirect("/projects");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function contactPage(req, res) {
  return res.render("contact");
}

module.exports = {
  contactPage,
  projectPage,
  projectDetailPage,
  projectAddPage,
  projectAdd,
  projectUpdatePage,
  projectUpdate,
  projectDelete,
};
