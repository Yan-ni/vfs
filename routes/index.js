const router = require("express").Router();

const controllers = require('../controllers');

router.get("/", controllers.view);

router.get("/api/:date", controllers.api);

router.use("*", (req, res) => res.sendStatus(404));

module.exports = router;
