import { getConnection  } from "../database/connections";

export const getServices = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM Servicio");

    res.json(result.recordset);
}