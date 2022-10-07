module.exports = app => {
  const advertisements = require("../controllers/advertisement.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", advertisements.create);

  // Retrieve all Tutorials
  router.get("/", advertisements.findAll);

  // Retrieve all published Tutorials
  router.get("/published", advertisements.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", advertisements.findOne);

  // Update a Tutorial with id
  router.put("/:id", advertisements.update);

  // Delete a Tutorial with id
  router.delete("/:id", advertisements.delete);

  // Delete all Tutorials
  router.delete("/", advertisements.deleteAll);

  app.use('/api/advertisements', router);
};
