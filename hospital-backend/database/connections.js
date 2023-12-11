import sql from 'mssql';
import config from '../config';

const dbConfig = {
    user: config.user,
    password: config.password,
    server: config.server,
    database: config.database,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // for Dev/test
    }
}

export async function getConnection(){
    try {
        const pool = await sql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.log(error);
    }
}