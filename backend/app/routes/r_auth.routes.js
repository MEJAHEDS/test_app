const { r_verifySignUp } = require("../middleware");
const controller = require("../controllers/r_auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/r_auth/signup",
    [
      r_verifySignUp.checkDuplicateUsernameOrEmail,
      r_verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/r_auth/signin", controller.signin);
};