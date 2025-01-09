const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");
const hbs = require("hbs");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const upload = require("./middleware/upload-file.js");

// const db = require("./config/connect");
const { getRelativeTime, changeDate, timePost } = require("./utils/time.js");
const { checkBox, summaryDesc, labelPost } = require("./utils/helper.js");

const {
  homeIndex,
  contactPage,
  aboutPage,
} = require("./controllers/page.controller.js");

const {
  authLogin,
  authRegister,
  loginPage,
  registerPage,
  authLogout,
} = require("./controllers/auth.controllers.js");

const {
  projectPage,
  projectDetailPage,
  projectAddPage,
  projectAdd,
  projectUpdatePage,
  projectUpdate,
  projectDelete,
} = require("./controllers/project.controllers.js");

const {
  blogPage,
  blogAdd,
  blogAddPage,
  blogDetailPage,
  blogUpdate,
  blogUpdatePage,
  blogDelete,
} = require("./controllers/blog.controller.js");

const {
  testimonialPage,
  testimonialAdd,
  testimonialAddPage,
  testimonialUpdate,
  testimonialUpdatePage,
  testimonialDelete,
  testimonialDetail,
} = require("./controllers/testimonial.controller.js");

const app = express();
const PORT = 5000;

dotenv.config();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(flash());
app.use(
  session({
    name: "my-session",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/dependecies", express.static(path.join(__dirname, "./dependecies")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// boostrap import
app.use(
  "/css",
  express.static(path.join(__dirname, "./node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "./node_modules/bootstrap/dist/js"))
);

hbs.registerPartials(path.join(__dirname, "./views/partials"), (err) => {
  if (err) console.error("Error registering partials:", err);
});
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("changeDate", changeDate);
hbs.registerHelper("timePost", timePost);

hbs.registerHelper("checkBox", checkBox);
hbs.registerHelper("summaryDesc", summaryDesc);
hbs.registerHelper("labelPost", labelPost);

// route lists
app.get("/", homeIndex);
app.get("/contact", contactPage);
app.get("/about", aboutPage);

// projects controlllers
app.get("/projects", projectPage);
app.get("/project/add", projectAddPage);
app.post("/project/add", upload.single("image"), projectAdd);
app.get("/project/:id/detail", projectDetailPage);
app.get("/project/:id/edit", projectUpdatePage);
app.put("/project/:id", upload.single("image"), projectUpdate);
app.delete("/project/:id", projectDelete);

// blog controllers
app.get("/blogs", blogPage);
app.get("/blogs/:id", blogDetailPage);
app.get("/blog/add", blogAddPage);
app.get("/blog/:id/edit", blogUpdatePage);
app.post("/blog/add", blogAdd);
app.put("/blog/:id", blogUpdate);
app.delete("/blog/:id", blogDelete);

// testimonial controllers
app.get("/testimonials", testimonialPage);
app.get("/testimonials/:id", testimonialDetail);
app.get("/testimonials/add", testimonialAddPage);
app.get("/testimonials/:id/edit", testimonialUpdatePage);
app.put("/testimonials/:id", testimonialUpdate);
app.post("/testimonials/add", testimonialAdd);
app.delete("/testimonials/:id", testimonialDelete);

// auth controllers
app.get("/login", loginPage);
app.get("/register", registerPage);
app.post("/logout", authLogout);
app.post("/register", authRegister);
app.post("/login", authLogin);

// custom page
app.get("/errors", () => {});
app.get("*", () => {});

// app.get("/api/blog", async (req, res) => {// });

app.listen(PORT, () => {
  console.log(`\nBerhasil menjalankan server pada http://localhost:${PORT}`);
  console.log(`Server berjalan pada port ${PORT}`);
});
