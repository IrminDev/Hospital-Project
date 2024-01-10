import { getConnection  } from "../database/connections";

export const getMedicalHistory = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request()
        .query("SELECT * FROM Bitacora_histmedico WHERE idPaciente = " + req.params.id);

        if(result.recordset.length > 0){
            const medicalHistory = {
                id: result.recordset[0].id,
                idPaciente: result.recordset[0].idPaciente,
                nombrePaciente: result.recordset[0].nombrePaciente,
                historial: result.recordset.map((record) => {
                    return {
                        nombreDoctor: record.usuario,
                        diagnostico: record.diagnostico,
                        fecha: record.fecha,
                        consultorio: record.consultorio,
                        costoTotal: record.costoTotal
                    }
                })
            }
        
            res.json([medicalHistory]);
        } else {
            res.json([]);
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