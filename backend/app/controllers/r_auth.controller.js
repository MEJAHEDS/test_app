const db = require("../models");
const config = require("../config/auth.config");
const R_user = db.r_user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { r_user } = require("../models");

exports.signup = (req, res) => {
  // Save R_user to Database
  R_user.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    name: req.body.name,
    firstname: req.body.firstname,
    postalCode: req.body.postalCode,
    address: req.body.address,
    city: req.body.city,
    phone: req.body.phone,
    cv: req.body.cv,
    profilPic: req.body.profilPic,
  })
    .then(r_user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          r_user.setRoles(roles).then(() => {
            res.send({ message: "R_user was registered successfully!" });
          });
        });
      } else {
        // r_user role = 2
        r_user.setRoles([2]).then(() => {
          res.send({ message: "R_user was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  R_user.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(r_user => {
      if (!r_user) {
        return res.status(404).send({ message: "R_user Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        r_user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: r_user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      r_user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: r_user.id,
          username: r_user.username,
          email: r_user.email,
          name: r_user.name,
          firstname: r_user.firstname,
          postalCode: r_user.postalCode,
          address: r_user.address,
          city: r_user.city,
          phone: r_user.phone,
          cv: r_user.cv,
          profilPic: r_user.profilpic,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};