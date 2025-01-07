const express = require("express");
const router = express.Router();
const controllerVoice = require("../controllers/controller");

router.put("/devices/:id", controllerVoice.putDevices);
router.get("/devices", controllerVoice.getAllDevices);

module.exports = router;
