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
    .query("SELECT * FROM Informacion_Consultas WHERE idConsulta = " + req.params.id);
    const consultation = {
        idConsulta: result.recordset[0].idConsulta,
        idDoctor: result.recordset[0].idDoctor,
        idPaciente: result.recordset[0].idPaciente,
        nombrePaciente: result.recordset[0].nombrePaciente,
        nombreDoctor: result.recordset[0].nombreDoctor,
        fecha: result.recordset[0].fecha,
        hora: result.recordset[0].hora,
        costo: result.recordset[0].costo,
        notaMedica: result.recordset[0].notaMedica,
        servicios: result.recordset
        .map((record) => {
            return {
                servicio: record.servicio,
                costo: record.precio
            }
        })
        
        .filter((servicio) => servicio !== null && servicio !== '')
    }

    res.json([consultation]);
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