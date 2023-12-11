import { getConnection  } from "../database/connections";

export const getBloodTypes = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM TipoSangre");

    res.json(result.recordset);
}