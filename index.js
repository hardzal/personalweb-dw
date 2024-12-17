const express = require("express");
const path = require("path");
const hbs = require("hbs");
const {
  homeIndex,
  blogPage,
  contactPage,
  projectPage,
  projectDetailPage,
} = require("./controllers/controllers");
const app = express();
const PORT = 5000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/dependecies", express.static(path.join(__dirname, "./dependecies")));

hbs.registerPartials(path.join(__dirname, "./views/partials"), (err) => {
  if (err) console.error("Error registering partials:", err);
});

// route lists
app.get("/", homeIndex);

app.get("/blogs", blogPage);
app.get("/blogs/:id", (req, res) => {});

// app.get("/blog/add", (req, res) => {});
// app.post("/blog/add", (req, res) => {});

app.get("/projects", projectPage);
app.get("/projects/:id", projectDetailPage);

// app.get("/project/add", () => {});
// app.post("/projects/add", () => {});

app.get("/contact", contactPage);

app.listen(PORT, () => {
  console.log(`\nBerhasil menjalankan server pada http://localhost:${PORT}`);
  console.log(`Server berjalan pada port ${PORT}`);
});
