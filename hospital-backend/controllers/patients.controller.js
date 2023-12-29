import { getConnection  } from "../database/connections";
import sql from 'mssql';

export const getPatients = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM Datos_Paciente");

    res.json(result.recordset);
}

export const getPatient = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .execute('getPatient');

    res.json(result.recordset);
}

