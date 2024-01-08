import { getConnection  } from "../database/connections";

export const getConsultings = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM Consultorio");

    res.json(result.recordset);
}