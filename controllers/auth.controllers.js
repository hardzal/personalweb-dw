const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const bcrypt = require("bcrypt");
const sequelize = new Sequelize(config.development);

// the high salt the high computation
const saltRounds = 10;

async function authRegister(req, res) {
  // mengam
  const { username, email, password, re_password } = req.body;

  // cek panjang email / password
  if (username.length < 3 || password.length < 3) {
    req.flash("error", "Username atau password kurang dari tiga karakter.");

    return res.redirect("/register");
  }

  // Cek kesamaan password
  if (password !== re_password) {
    req.flash("error", "Password tidak sama.");

    return res.redirect("/register");
  }

  const query = `SELECT * FROM public."Users" WHERE email = :email or username = :username`;
  const user = await sequelize.query(query, {
    replacements: {
      email: email,
      username: username,
    },
    type: QueryTypes.SELECT,
  });

  // cek apakah sudah terdaftar
  if (user.length != 0) {
    req.flash("error", "Email atau username telah terdaftar!");
    req.flash("email", email);
    req.flash("username", password);

    return res.redirect("/register");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `INSERT INTO public."Users"(username, password, email) VALUES(:username, :password, :email)`;

    const user = await sequelize.query(query, {
      replacements: {
        username: username,
        email: email,
        password: hashedPassword,
      },
      type: QueryTypes.INSERT,
    });

    if (user) {
      req.flash("success", "Berhasil mendaftar. Silahkan login");

      res.redirect("/login");
    } else {
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function authLogin(req, res) {
  const { email, password } = req.body;
  console.log(email);
  try {
    const query = `SELECT * FROM public."Users" 
      WHERE email = :email`;

    const user = await sequelize.query(query, {
      replacements: {
        email: email,
      },
      type: QueryTypes.SELECT,
    });

    if (user.length == 0) {
      req.flash("error", "User tidak ditemukan!");
      return res.redirect("/login");
    }

    const isValidated = await bcrypt.compare(password, user[0].password);

    if (!isValidated) {
      req.flash("error", "Password tidak cocok.");
      return res.redirect("/login");
    }

    // let loggedInUser = user.toJSON();
    let loggedInUser = user[0];
    delete loggedInUser.password;
    req.session.user = loggedInUser;

    req.flash("success", "Berhasil login!");
    console.log(user);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function authLogout(req, res) {
  req.session.user = null;

  res.redirect("/login");
}

async function loginPage(req, res) {
  const user = req.session.user || null;

  if (user) {
    res.redirect("/");
  } else {
    res.render("auth/login");
  }
}

async function registerPage(req, res) {
  const user = req.session.user || null;

  if (user) {
    res.redirect("/");
  } else {
    res.render("auth/register");
  }
}

module.exports = {
  authLogin,
  authRegister,
  authLogout,
  loginPage,
  registerPage,
};
