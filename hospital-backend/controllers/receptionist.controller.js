import { getConnection  } from "../database/connections";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const createReceptionist = async (req, res) => {
    const { user, curp, mail, password, name, fatherLastName, motherLastName, idConsulting} = req.body
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
    .input('idConsulting', idConsulting)
    .execute('createReceptionist', (err, result) => {
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