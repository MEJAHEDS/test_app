const db = require("../models");
const Advertisement = db.advertisements;
const Op = db.Sequelize.Op;

// Create and Save a new Advertisement
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Advertisement
  const advertisement = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    experience: req.body.experience,
    description: req.body.description,
    location: req.body.location,
    contrat: req.body.contrat,
     remote: req.body.remote,
     salarie: req.body.salarie,
  };

  // Save Advertisement in the database
  Advertisement.create(advertisement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Advertisement."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Advertisement.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Advertisement with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Advertisement.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Advertisement with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Advertisement with id=" + id
      });
    });
};

// Update a Advertisement by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Advertisement.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Advertisement was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Advertisement with id=${id}. Maybe Advertisement was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Advertisement with id=" + id
      });
    });
};

// Delete a Advertisement with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Advertisement.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Advertisement was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Advertisement with id=${id}. Maybe Advertisement was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Advertisement with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Advertisement.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Advertisement
exports.findAllPublished = (req, res) => {
  Advertisement.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
