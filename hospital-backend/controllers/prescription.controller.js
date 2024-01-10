import { getConnection  } from "../database/connections";
import sql from 'mssql';

export const getPrescriptionById = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request()
        .query("SELECT * FROM Informacion_Receta WHERE idReceta = " + req.params.id);

        const prescription = {
            idReceta: result.recordset[0].idReceta,
            recomendaciones: result.recordset[0].recomendaciones,
            suministro: result.recordset.map((row) => {
                return {
                    medicamento: row.medicamento,
                    cantidad: row.cantidad,
                    descripcion: row.descripcion
                }
            })
        }

        res.json([prescription]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error on db',
            errors: error
        });
    }
}

export const createPrescription= async (req, res) => {
    const { consultation, tip, supplies } = req.body;
    const pool = await getConnection()
    try{
        await pool.request()
        .input('id', sql.Int, consultation)
        .input('tip', sql.NVarChar, tip)
        .execute('createPrescription')
        
        if (supplies.length > 0) {
            await Promise.all(supplies.map(async (supply) => {
                await pool.request()
                    .input('idMedicine', sql.Int, supply.medicine)
                    .input('idPrescription', sql.Int, consultation)
                    .input('quantity', sql.Int, supply.quantity)
                    .input('description', sql.NVarChar, supply.description)
                    .execute('addSupply');
            }));
        }
    
        res.status(200).json({
            ok: true,
            message: 'Consulta creada con éxito',
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error on db',
            errors: error
        });
    }
}