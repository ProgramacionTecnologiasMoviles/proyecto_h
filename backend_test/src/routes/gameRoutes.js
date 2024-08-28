const express = require("express");
const gameController = require("../controller/gameController");

const router = express.Router();

router.get("/", gameController.getGame);

module.exports = router;
