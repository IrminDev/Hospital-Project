import { getConnection  } from "../database/connections";
import sql from 'mssql';

export const getPersons = async (req, res) => {
    const pool = await getConnection()
    try {
        const result = await pool.request()
        .query("SELECT * FROM Persona");

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

export const deletePersons = async (req, res) => {
    const {id} = req.params;
    const pool = await getConnection()
    try {
        await pool.request()
        .input('id', sql.Int, id)
        .execute("deletePerson");

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error on db',
            errors: error
        });
    }
}

export const changeName = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    try {
        const pool = await getConnection()
        await pool.request()
        .query(`UPDATE Persona SET nombre = '${name}' WHERE idPersona = ${id}`);

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error on db',
            errors: error
        });
    }
}

export const getPerson = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .execute('getPerson');

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