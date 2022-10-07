const { r_user } = require("../models");
const db = require("../models");
const ROLES = db.ROLES;
const R_user = db.r_user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  R_user.findOne({
    where: {
      username: req.body.username
    }
  }).then(r_user => {
    if (r_user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    R_user.findOne({
      where: {
        email: req.body.email
      }
    }).then(r_user => {
      if (r_user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const r_verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = r_verifySignUp;