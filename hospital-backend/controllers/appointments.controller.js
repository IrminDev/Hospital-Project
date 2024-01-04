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
    .input('idDoctor', req.params.idDoctor)
    .input('idPatient', req.params.idDoctor)
    .input('date', req.params.day) 
    .execute('listAppointmentsByIdAndSchedule')
    
    res.json(result.recordset);
}

export const createAppointment = async (req, res) => {
    const { idPaciente, idDoctor, idTipoCita, fecha, hora } = req.body;
    const pool = await getConnection()
    await pool.request()
    .input('idPatient', sql.Int, idPaciente)
    .input('idDoctor', sql.Int, idDoctor)
    .input('idEspeciality', sql.Int, idTipoCita)
    .input('datetime', sql.VarChar, `${fecha} ${hora}`)
    .execute('createAppointment', (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    message: 'Error on db',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                appointment: result.recordset[0]
            });
        }
    );
}

export const getCompletedAppointments = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query('SELECT * FROM informacion_cita WHERE idDoctor = ' + req.params.id + ' AND fecha < GETDATE() AND hora < CAST(GETDATE() AS TIME)')

    res.json(result.recordset);
}