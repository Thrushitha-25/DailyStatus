module.exports = app => {
const tutorials = require("../controllers/controller.js");
  
var router = require("express").Router();
router.post("/hi", tutorials.post);
router.get("/", tutorials.getAll);
router.put("/:id1", tutorials.put);
router.delete("/:id", tutorials.delete);
app.use('/api/tutorials', router);
};