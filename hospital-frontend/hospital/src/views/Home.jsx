import React from 'react'
import { useEffect } from 'react'
import personService from '../services/person'
import appointmentService from '../services/appointment'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'
import CountCard from '../components/CountCard'
import ButtonLink from '../components/ButtonLink'
import AppointmentCard from '../components/AppointmentCard'
import moment from 'moment'
import Button from '../components/Button'

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
            name: '',
            fatherLastName: '',
            motherLastName: '',
            curp: '',
            mail: '',
            type: 0,
            user: '',
    });

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'));
        if (!session) {
            navigate('/login')
        }

        personService.getPersonById(session.id).then((resp) => {
            setUser({
                name: resp[0].nombre,
                fatherLastName: resp[0].apPaterno,
                motherLastName: resp[0].apMaterno,
                curp: resp[0].curp,
                mail: resp[0].correo,
                user: resp[0].usuario,
                type: resp[0].idTipoUsuario
            })
        })


    }, []);

    return (
        <div>
            {user.type === 1 ? 
            <PatientHome /> :
            user.type === 2 ?
            <DoctorHome /> :
            <ReceptionistHome />}
        </div>
    )
}

const DoctorHome = () => {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'));
        appointmentService.getAppointmentsForUser(session.id).then((resp) => {
            resp.map((element) => {
                setAppointments((appointment) => [...appointment, {
                    name: element.nombrePaciente + ' ' + element.apPaternoPaciente + ' ' + element.apMaternoPaciente,
                    date: moment(element.fecha, "YYYY-MM-DD").format('YYYY-MM-DD'),
                    time: moment(element.hora, "YYYY-MM-DDTHH:mm:ss.SSSZ").utc().format('HH:mm:ss'),
                    type: element.tipoCita,
                    status: element.estadoCita,
                    id: element.idCita
                }])
            })
        })
    }, [])

    return (
        <div>
            <Header>
                <HeaderLink text={'Citas'} url={'../home'} />
                <HeaderLink text={'Consultas'} url={'../doctor/consultations'} />
                <HeaderLink text={'Pacientes'} url={'../doctor/patients'} />
                <HeaderLink text={'Perfil'} url={'../doctor/profile'} />
            </Header>

            <div className=' min-h-screen pt-32 flex flex-col items-center justify-start'>
                <div className=' rounded-lg py-4 bg-blue-300 w-[80%] flex flex-row items-center justify-evenly'>
                    <div className=' w-[50%] flex flex-row justify-between'>
                        <CountCard count={appointments.filter(app => app.status === 'Pendiente').length} text={'Citas pendientes'} />
                        <CountCard count={appointments.filter(app => app.status === 'Completada').length} text={'Citas completadas'} />
                        <CountCard count={appointments.filter(app => app.status === 'Cancelada').length} text={'Citas canceladas'} />
                    </div>
                </div>
                <div className=' w-[85%] mt-5'>
                    {appointments.map((appointment) => {
                        return <AppointmentCard key={appointment.id} appointment={appointment} />
                    })}
                </div>
            </div>
        </div>
    )
}

const PatientHome = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'));
        appointmentService.getAppointmentsForUser(session.id).then((resp) => {
            resp.map((element) => {
                setAppointments((appointment) => [...appointment, {
                    name: 'Dr ' + element.nombreDoctor + ' ' + element.apPaternoDoctor + ' ' + element.apMaternoDoctor,
                    date: moment(element.fecha, "YYYY-MM-DD").format('YYYY-MM-DD'),
                    time: moment(element.hora, "YYYY-MM-DDTHH:mm:ss.SSSZ").utc().format('HH:mm:ss'),
                    type: element.tipoCita,
                    status: element.estadoCita,
                    id: element.idCita
                }])
            })
        })
    }, [])

    return (
        <div>
            <Header>
                <HeaderLink text={'Citas'} url={'../home'} />
                <HeaderLink text={'Consultas'} url={'../patient/consultations'} />
                <HeaderLink text={'Compras'} url={'../patient/purchases'} />
                <HeaderLink text={'Perfil'} url={'../patient/profile'} />
            </Header>

            <div className=' w-full mt-32 flex flex-col items-center justify-start'>
                <div className=' rounded-lg bg-blue-300 w-[80%] flex flex-row items-center justify-evenly p-5'>
                    <div className=' w-[50%] flex flex-row justify-evenly'>
                        <CountCard count={appointments.filter(app => app.status === 'Pendiente').length} text={'Citas pendientes'} />
                        <CountCard count={appointments.filter(app => app.status === 'Completada').length} text={'Citas finalizadas'} />
                    </div>
                    <div className=' w-[50%] flex items-center justify-end'>
                        <ButtonLink url={'../patient/create-appointment'} text={'Agenda una cita'} />
                    </div>
                </div>
                <div className=' w-[85%] mt-5'>
                    {appointments.map((appointment) => {
                        return <AppointmentCard key={appointment.id} appointment={appointment} >
                            <ButtonLink url={'../patient/appointment/' + appointment.id} text={'Ver cita'} />
                        </AppointmentCard>
                    })}
                </div>
            </div>

        </div>
    )
}

const ReceptionistHome = () => {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'));
        appointmentService.getAppointmentsForUser(session.id).then((resp) => {
            resp.map((element) => {
                setAppointments((appointment) => [...appointment, {
                    name: element.nombrePaciente + ' ' + element.apPaternoPaciente + ' ' + element.apMaternoPaciente,
                    date: moment(element.fecha, "YYYY-MM-DD").format('YYYY-MM-DD'),
                    time: moment(element.hora, "YYYY-MM-DDTHH:mm:ss.SSSZ").utc().format('HH:mm:ss'),
                    type: element.tipoCita,
                    status: element.estadoCita,
                    id: element.idCita
                }])
            })
        })
    }, [])

    const handleCancel = (e, id) => {
        e.preventDefault()

        appointmentService.deleteAppointment(id).then((resp) => {
            const session = JSON.parse(localStorage.getItem('user'));
            appointmentService.getAppointmentsForUser(session.id).then((resp) => {
                setAppointments([])
                resp.map((element) => {
                    setAppointments((appointment) => [...appointment, {
                        name: element.nombrePaciente + ' ' + element.apPaternoPaciente + ' ' + element.apMaternoPaciente,
                        date: moment(element.fecha, "YYYY-MM-DD").format('YYYY-MM-DD'),
                        time: moment(element.hora, "YYYY-MM-DDTHH:mm:ss.SSSZ").utc().format('HH:mm:ss'),
                        type: element.tipoCita,
                        status: element.estadoCita,
                        id: element.idCita
                    }])
                })
            })
        })
    }

    return (
        <div>
            <Header>
                <HeaderLink text={'Citas'} url={'../home'} />
                <HeaderLink text={'Compras'} url={'../receptionist/purchases'} />
                <HeaderLink text={'Inventario'} url={'../receptionist/inventory'} />
                <HeaderLink text={'Doctores'} url={'../receptionist/doctors'} />
                <HeaderLink text={'Pacientes'} url={'../receptionist/patients'} />
                <HeaderLink text={'Perfil'} url={'../receptionist/profile'} />
            </Header>

            <div className=' flex flex-col items-center justify-start w-full py-8'>
                <div className=' rounded-lg bg-blue-300 mt-28 w-[80%] flex flex-row items-center justify-start px-5 py-3'>
                    <div className=' w-[60%] flex flex-row justify-evenly'>
                        <CountCard count={appointments.filter(app => app.status === 'Pendiente').length} text={'Citas pendientes'} />
                        <CountCard count={appointments.filter(app => app.status === 'Completada').length} text={'Citas completadas'} />
                        <CountCard count={appointments.filter(app => app.status === 'Cancelada').length} text={'Citas canceladas'} />
                    </div>
                    <div className=' w-[30%] flex items-center justify-between'>
                        <ButtonLink url={'../receptionist/create-appointment'} text={'Agenda una cita'} />
                    </div>
                </div>
                <div className=' w-[85%] mt-5'>
                    {appointments.map((appointment) => {
                        return <AppointmentCard key={appointment.id} appointment={appointment}>
                            <div className=' w-[47%]'>
                                <ButtonLink url={'../receptionist/edit-appointment/' + appointment.id} text={'Editar cita'} />
                            </div>
                            <div className=' w-[47%]'>
                                <Button text={'Cancelar'} handleClick={e => handleCancel(e, appointment.id)} />
                            </div>
                        </AppointmentCard>
                    })}
                </div>
            </div>

        </div>
    )
}

export default Home