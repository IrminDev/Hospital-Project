import express from 'express'
import config from './config'
import cors from 'cors'

import personsRouter from './routers/persons.routes'
import bloodTypeRouter from './routers/bloodType.routes'
import signUpRouter from './routers/signUp.routes'
import loginRouter from './routers/login.routes'
import patientsRouter from './routers/patients.routes'
import appointmentsRouter from './routers/appointments.routes'
import appointmentTypes from './routers/appointmentTypes.routes'
import doctorsRouter from './routers/doctors.routes'
import consultationRouter from './routers/consultations.routes'
import servicesRouter from './routers/services.routes'
import medicineRouter from './routers/medicines.routes'
import prescriptionRouter from './routers/prescription.routes'
import receptionistRouter from './routers/receptionst.routes'

const app = express();
app.use(cors())
app.set('port', config.port);

app.use(express.json());
app.use(personsRouter);
app.use(bloodTypeRouter);
app.use(signUpRouter);
app.use(loginRouter)
app.use(patientsRouter);
app.use(appointmentsRouter);
app.use(appointmentTypes);
app.use(doctorsRouter);
app.use(doctorsRouter);
app.use(consultationRouter)
app.use(servicesRouter)
app.use(medicineRouter)
app.use(prescriptionRouter)
app.use(receptionistRouter)


export default app