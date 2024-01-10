import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config  } from 'dotenv';
import { getConnection } from "../database/connections";
config()

export const signUp = async (req, res) => {
    try {
        const pool = await getConnection();
        const { name, fatherLastName, motherLastName, user, curp, mail, password, height, weight, bloodType } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        await pool.request()
        .input('name', name)
        .input('fatherLastName', fatherLastName)
        .input('motherLastName', motherLastName)
        .input('user', user)
        .input('curp', curp)
        .input('mail', mail)
        .input('password', hashedPassword)
        .input('height', height)
        .input('weight', weight)
        .input('bloodtype', bloodType)
        .execute('registrarPaciente', (err, result) => {
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
                // Create the JWT
                result.recordset[0].contrasena = 'No this time my friend';
                const token = jwt.sign(result.recordset[0], process.env.JWT_SEED, { expiresIn: 14400 });

                res.status(200).json({
                    ok: true,
                    token: token,
                    user: result.recordset[0],
                    id: result.recordset[0].idPersona
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