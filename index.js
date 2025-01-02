const express = require("express");
const path = require("path");
const hbs = require("hbs");
const flash = require("express-flash");
const methodOverride = require("method-override");
// const db = require("./config/connect");
const { getRelativeTime, changeDate } = require("./utils/time.js");
const { checkBox, flashMessage } = require("./utils/helper.js");

const {
  homeIndex,
  contactPage,
  projectPage,
  projectDetailPage,
  projectAddPage,
  projectAdd,
  projectUpdatePage,
  projectUpdate,
  projectDelete,
} = require("./controllers/project.controllers.js");

const {
  authLogin,
  authRegister,
  loginPage,
  registerPage,
} = require("./controllers/auth.controllers.js");

const app = express();
const PORT = 5000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/dependecies", express.static(path.join(__dirname, "./dependecies")));

hbs.registerPartials(path.join(__dirname, "./views/partials"), (err) => {
  if (err) console.error("Error registering partials:", err);
});
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("changeDate", changeDate);
hbs.registerHelper("checkBox", checkBox);
hbs.registerHelper("flashMessage", flashMessage);

// route lists
app.get("/", homeIndex);

app.get("/projects", projectPage);
app.get("/project/add", projectAddPage);
app.post("/project/add", projectAdd);
app.get("/project/:id/edit", projectUpdatePage);
app.put("/project/:id", projectUpdate);
app.delete("/project/:id", projectDelete);
app.get("/projects/:id/detail", projectDetailPage);

app.get("/blogs", blogPage);
app.get("/blogs/:id", blogDetailPage);
app.get("/blog/add", blogAddPage);
app.post("/blog/add", (req, res) => {});

app.get("/contact", contactPage);

app.get("/login", (req, res) => {
  res.render("auth-login");
});

app.get("/register", (req, res) => {
  res.render("auth-register");
});

app.post("/register", (res, req) => {
  // masukkan input
  // convert passwword menggunakan bcrypt
});
app.post("/login", (res, req) => {});

// app.get("/api/blog", async (req, res) => {// });

app.listen(PORT, () => {
  console.log(`\nBerhasil menjalankan server pada http://localhost:${PORT}`);
  console.log(`Server berjalan pada port ${PORT}`);
});
