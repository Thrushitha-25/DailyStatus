module.exports = app => {
    const sign = require("../controllers/sign.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", sign.create);
  
    // Retrieve all sign
    router.get("/", sign.findAll);
  
    // Retrieve all published sign
    router.get("/published", sign.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", sign.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", sign.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", sign.delete);
  
    // Delete all sign
    router.delete("/", sign.deleteAll);
  
    app.use('/api/signup', router);
  };