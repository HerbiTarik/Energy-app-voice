const express = require("express");
const router = express.Router();
const controllerVoice = require("../controllers/controller");

router.put("/devices/:id", controllerVoice.putDevices);
router.put("/options/:id", controllerVoice.putOptions);
router.get("/devices", controllerVoice.getAllDevices);
router.get("/options", controllerVoice.getAllOptions);

module.exports = router;
