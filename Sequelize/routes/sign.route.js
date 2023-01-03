module.exports = app => {
    const sign = require("../controllers/controller.js");
  
    var router = require("express").Router();
    router.post("/", sign.post);
 
    router.get("/", sign.getAll);
  
    app.use('/api/signup', router);
  };