import { getConnection  } from "../database/connections";

export const getSpecialities = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM Especialidad");

    res.json(result.recordset);
}