import { getConnection  } from "../database/connections";

export const getSchedules = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request()
        .query("SELECT * FROM Horario");

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