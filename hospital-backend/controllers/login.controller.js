import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config  } from 'dotenv';
import { getConnection  } from "../database/connections";
config()

export const postLogin = async (req, res) => {
    const body = req.body;
    const pool = await getConnection();
    try {
        await pool.request()
        .input('username', body.user)
        .execute('iniciarSesion', (err, result) => {
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
                    message: 'Incorrect credentials - username',
                    errors: err
                });
            }
            
            if (!bcrypt.compareSync(body.password, result.recordset[0].contrasena)) {
                return res.status(400).json({
                    ok: false,
                    message: 'Incorrect credentials - password',
                    errors: err
                });
            }
            
            // Create the JWT
            result.recordset[0].contrasena = 'No this time my friend';
            const token = jwt.sign({ usuario: result.recordset[0] }, process.env.JWT_SEED, { expiresIn: 14400 });

            res.status(200).json({
                ok: true,
                token: token,
                user: result.recordset[0],
                id: result.recordset[0].idPersona
            });
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error on db',
            errors: error
        });
    }
};