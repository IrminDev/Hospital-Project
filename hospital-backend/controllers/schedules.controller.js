import { getConnection  } from "../database/connections";

export const getSchedules = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM Horario");

    res.json(result.recordset);
}