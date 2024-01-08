import { getConnection  } from "../database/connections";

export const getPayments = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM MetodoPago");

    res.json(result.recordset);
}