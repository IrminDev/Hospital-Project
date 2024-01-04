import { getConnection  } from "../database/connections";
import sql from 'mssql';

export const getConsultationsByUser = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .input('idUser', req.params.idUser)
    .execute('listConsultationsByUser')

    res.json(result.recordset);
}

export const getConsultationById = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM Consultas WHERE idCita = " + req.params.id);

    res.json(result.recordset);
}

export const createConsultation = async (req, res) => {
    const { appointment, services, cost, note } = req.body;
    const pool = await getConnection()
    try{
        await pool.request()
        .input('id', sql.Int, appointment)
        .input('cost', sql.Int, cost)
        .input('note', sql.NVarChar, note)
        .execute('createConsultation')
        
        if (services.length > 0) {
            await Promise.all(services.map(async (service) => {
                await pool.request()
                    .input('id', sql.Int, appointment)
                    .input('service', sql.Int, service)
                    .execute('addServiceToConsultation');
            }));
        }
    
        res.status(200).json({
            ok: true,
            message: 'Consulta creada con éxito',
        });
    } catch(error) {
        res.status(500).json({
            ok: false,
            message: 'Error on db',
            errors: error
        });
    }

}