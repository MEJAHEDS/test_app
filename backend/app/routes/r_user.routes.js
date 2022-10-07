const { r_authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [r_authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [r_authJwt.verifyToken, r_authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [r_authJwt.verifyToken, r_authJwt.isAdmin],
    controller.adminBoard
  );
};