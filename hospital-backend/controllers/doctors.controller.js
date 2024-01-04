import { getConnection  } from "../database/connections";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getDoctorsByAppointmentType = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .input('idAppointmentType', req.params.id)
    .execute('listDoctorsForAppointment')

    res.json(result.recordset);
}

export const getDoctor = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM Datos_Doctor WHERE idPersona = " + req.params.id)
    
    const doctor = {
        idPersona: result.recordset[0].idPersona,
        idConsultorio: result.recordset[0].idConsultorio,
        horaInicio: result.recordset[0].horaInicio,
        horaFin: result.recordset[0].horaFin,
        curp: result.recordset[0].curp,
        cedula: result.recordset[0].cedula,
        nombre: result.recordset[0].nombre,
        apPaterno: result.recordset[0].apPaterno,
        apMaterno: result.recordset[0].apMaterno,
        especialidades: result.recordset
        .map((record) => record.especialidad)
        .filter((especialidad) => especialidad !== null && especialidad !== '')
    }

    res.json([doctor]);
}

export const createDoctor = async (req, res) => {
    const { user, curp, mail, password, name, fatherLastName, motherLastName, idSchedule, idConsulting, professionalID} = req.body
    console.log(req.body)
    const pool = await getConnection()
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await pool.request()
    .input('user', user)
    .input('curp', curp)
    .input('mail', mail)
    .input('password', hashedPassword)
    .input('name', name)
    .input('fatherLastName', fatherLastName)
    .input('motherLastName', motherLastName)
    .input('idSchedule', idSchedule)
    .input('idConsulting', idConsulting)
    .input('professionalID', professionalID)
    .execute('createDoctor', (err, result) => {
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

        result.recordset[0].contrasena = 'No this time my friend';
        const token = jwt.sign(result.recordset[0], process.env.JWT_SEED, { expiresIn: 14400 });

        res.status(200).json({
            ok: true,
            token: token,
            user: result.recordset[0],
            id: result.recordset[0].idPersona
        });
    })
}