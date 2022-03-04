const router = require("express").Router();

const controller = require('./controller');

router.get("/", controller.view);

router.get("/api/:date", controller.api);

router.use("*", (req, res) => res.sendStatus(404));

module.exports = router;
