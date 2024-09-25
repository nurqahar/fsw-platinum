const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch (error) {
    res.render("signup", { error: "Email already in use" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render("login", { error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });
    res.cookie("token", token).redirect("/profile");
  } catch (error) {
    res.render("login", { error: "And error occured" });
  }
};

const profile = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  const decoded = jwt.verify(token, "secretkey");
  const user = await User.findById(decoded.id);
  res.render("profile", { user });
};

module.exports = { signUp, login, profile };
