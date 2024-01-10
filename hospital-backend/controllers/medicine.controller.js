import { getConnection  } from "../database/connections";
import sql from "mssql";

export const getMedicines = async (req, res) => {
    const pool = await getConnection()
    try {
        const result = await pool.request()
        .query("SELECT * FROM Medicamento");

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

export const getMedicineById = async (req, res) => {
    const { id } = req.params;
    const pool = await getConnection()
    try {
        const result = await pool.request()
        .input('id', id)
        .query("SELECT * FROM Medicamento WHERE idMedicamento = @id");

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

export const updateMedicine = async (req, res) => {
    const { quantity, id } = req.body;
    const pool = await getConnection()
    try {
        await pool.request()
        .input('id', sql.Int, id)
        .input('quantity', sql.Int, quantity)
        .execute("updateInventory");

        res.status(200).json({
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error on db',
            errors: error
        });
    }
}