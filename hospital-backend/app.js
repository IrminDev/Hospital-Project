import express from 'express'
import config from './config'
import cors from 'cors'

import personsRouter from './routers/persons.routes'
import bloodTypeRouter from './routers/bloodType.routes'
import signUpRouter from './routers/signUp.routes'
import loginRouter from './routers/login.routes'

const app = express();
app.use(cors())
app.set('port', config.port);

app.use(express.json());
app.use(personsRouter);
app.use(bloodTypeRouter);
app.use(signUpRouter);
app.use(loginRouter)

export default app