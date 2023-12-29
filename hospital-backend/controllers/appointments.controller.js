import { getConnection  } from "../database/connections";
import sql from 'mssql';

export const getAppointmentsByUser = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .input('idUser', sql.Int, req.params.idUser)
    .execute('listAppointmentsByUser');

    res.json(result.recordset);
}

export const getAppointmentById = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM informacion_cita WHERE idCita = " + req.params.id);

    res.json(result.recordset);
}

export const editAppointment = async (req, res) => {
    
}

export const getAppointmentTypes = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM TipoCita")

    res.json(result.recordset);
}

export const getAppointmentsBySchedule = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM informacion_cita WHERE fecha = " + req.params.day + " AND idDoctor = " + req.params.idDoctor)   
}