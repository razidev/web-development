const bcrypt = require("bcryptjs");
const AuthModel = require("../models/auth");
const validationSession = require("../util/validation-session");
const validation = require("../util/validation");

function signup(req, res) {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
  });

  res.render("signup", {
    inputData: sessionErrorData,
  });
}

function login(req, res) {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    password: "",
  });

  res.render("login", {
    inputData: sessionErrorData,
  });
}

async function signupForm(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  if (
    !validation.signupIsValid(
      enteredEmail,
      enteredConfirmEmail,
      enteredPassword
    )
  ) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/signup");
      }
    );

    return;
  }

  const findUser = new AuthModel(enteredEmail);
  const existingUser = await findUser.isExistingUser();
  if (existingUser) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "User exists already!",
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  const auth = new AuthModel(enteredEmail, enteredPassword);
  await auth.insertUser();

  res.redirect("/login");
}

async function loginForm(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = new AuthModel(enteredEmail, enteredPassword);
  const user = await existingUser.getUserByEmail();
  if (!user) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Could not log you in - please check your credentials!",
        email: enteredEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  const passwordsAreEqual = await existingUser.comparePassword(user.password);

  if (!passwordsAreEqual) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Could not log you in - please check your credentials!",
        email: enteredEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/admin");
  });
}

function logout(req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
}

module.exports = {
  signup,
  login,
  signupForm,
  loginForm,
  logout,
};
