import { getConnection  } from "../database/connections";

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

    res.json(result.recordset);
}