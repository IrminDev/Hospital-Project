import { getConnection  } from "../database/connections";

export const getMedicines = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM Medicamento");

    res.json(result.recordset);
}