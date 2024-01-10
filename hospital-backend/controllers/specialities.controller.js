import { getConnection  } from "../database/connections";

export const getSpecialities = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request()
        .query("SELECT * FROM Especialidad");

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