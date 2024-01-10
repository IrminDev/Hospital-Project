import { getConnection  } from "../database/connections";
import sql from 'mssql';

export const getAppointmentsByUser = async (req, res) => {
    const pool = await getConnection()
    try {
        const result = await pool.request()
        .input('idUser', sql.Int, req.params.idUser)
        .execute('listAppointmentsByUser');

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

export const getAppointmentById = async (req, res) => {
    const pool = await getConnection()
    try {
        const result = await pool.request()
        .query("SELECT * FROM informacion_cita WHERE idCita = " + req.params.id);

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

export const getAppointmentTypes = async (req, res) => {
    const pool = await getConnection()
    try {
        const result = await pool.request()
        .query("SELECT * FROM TipoCita")

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

export const getAppointmentsBySchedule = async (req, res) => {
    const pool = await getConnection()
    try {
        const result = await pool.request()
        .input('idDoctor', req.params.idDoctor)
        .input('idPatient', req.params.idPatient)
        .input('date', req.params.day) 
        .execute('listAppointmentsByIdAndSchedule')
        
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

export const createAppointment = async (req, res) => {
    const { idPaciente, idDoctor, idTipoCita, fecha, hora } = req.body;
    const pool = await getConnection()
    try {
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
                    appointment: result.recordset[0].idCita
                });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error on db',
            errors: error
        });
    }
}

export const getCompletedAppointments = async (req, res) => {
    const pool = await getConnection()
    try {
        const result = await pool.request()
        .query('SELECT * FROM informacion_cita WHERE idDoctor = ' + req.params.id + ' AND fecha < GETDATE() AND hora < CAST(GETDATE() AS TIME)')

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

export const cancelAppointment = async (req, res) => {
    const pool = await getConnection()
    try {
        const result1 = await pool.request()
        .query("SELECT * FROM informacion_cita WHERE idCita = " + req.params.id);

        if(result1.recordset[0].estadoCita === 'Pendiente'){
            const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .execute('cancelAppointment')
            
            res.status(200).json({
                ok: true,
                message: 'Appointment canceled',
            })
        } else{
            res.status(200).json({
                ok: false,
                message: 'Appointment already canceled or was completed',
            })
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

export const updateAppointment = async (req, res) => {
    const { id, doctor, type, date, schedule } = req.body;
    try {
        const pool = await getConnection()
        await pool.request()
        .input('id', sql.Int, id)
        .input('doctor', sql.Int, doctor)
        .input('type', sql.Int, type)
        .input('date', sql.Date, date)
        .input('time', sql.VarChar, schedule)
        .execute('updateAppointment', (err, result) => {
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
                });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error on db',
            errors: error
        });
    }
}