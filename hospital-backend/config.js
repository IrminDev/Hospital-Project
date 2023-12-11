import { config } from "dotenv"
config()

export default {
    port: process.env.PORT || 3000,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME
}