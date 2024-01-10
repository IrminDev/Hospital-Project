import { getConnection  } from "../database/connections";
import sql from 'mssql';

export const getPatients = async (req, res) => {
    const pool = await getConnection()
    try {
        const result = await pool.request()
        .query("SELECT * FROM Datos_Paciente WHERE habilitado = 1");

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

export const getPatient = async (req, res) => {
    const pool = await getConnection()
    try {
        const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .execute('getPatient');

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

export const deletePatient = async (req, res) => {
    const pool = await getConnection()
    try {
        const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .execute('deletePatient');

        if(!result.recordset){
            res.status(204).json({
                ok: true
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error on db',
            errors: error
        });
    }
}