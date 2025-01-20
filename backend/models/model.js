const pool = require("../config/db");

const modelVoice = {
  findDevices: async () => {
    const res = await pool.query("select * from appareils order by id");
    return res.rows;
  },
  updateDevices: async (id, voix_detectee) => {
    const res = await pool.query(
      "UPDATE appareils set voix_detectee = $1 where id = $2 RETURNING *",
      [voix_detectee, id]
    );
    return res.rows[0];
  },
  findOptions: async () => {
    const res = await pool.query("select * from options order by id");
    return res.rows;
  },
  updateOptions: async (id, voix_detectee) => {
    const res = await pool.query(
      "UPDATE options set voix_detectee = $1 where id = $2 RETURNING *",
      [voix_detectee, id]
    );
    return res.rows[0];
  },
};

module.exports = modelVoice;
