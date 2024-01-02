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
    const { idPaciente, idDoctor, idTipoCita, fecha, hora } = req.body;
    const pool = await getConnection()
    const result = await pool.request()
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
            if (!result.recordset[0]) {
                return res.status(400).json({
                    ok: false,
                    message: 'There was an error saving your data',
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