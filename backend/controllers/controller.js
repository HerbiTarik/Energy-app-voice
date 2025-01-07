const modelVoice = require("../models/model");

const controllerVoice = {
  getAllDevices: async (req, res) => {
    try {
      const devices = await modelVoice.findDevices();
      res.status(200).json(devices);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  putDevices: async (req, res) => {
    const { voix_detectee } = req.body;
    const { id } = req.params;
    try {
      const response = await modelVoice.updateDevices(id, voix_detectee);
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = controllerVoice;
