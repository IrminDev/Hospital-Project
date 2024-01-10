import { getConnection  } from "../database/connections";

export const getPayments = async (req, res) => {
    const pool = await getConnection()
    try {
        const result = await pool.request()
        .query("SELECT * FROM MetodoPago");

        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error on db',
            errors: error
        });
    }
}