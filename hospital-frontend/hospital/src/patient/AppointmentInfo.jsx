import moment from 'moment'
import React from 'react'
import { useEffect, useState } from 'react'
import personService from '../services/person'
import appointmentService from '../services/appointment'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'

const AppointmentInfo = () => {
    const { id } = useParams()
    
    const navigate = useNavigate()

    const [appointment, setAppointment] = useState({
        id: 0,
        date: '',
        hour: '',
        doctor: '',
        patient: '',
        cost: 0,
        consulting: '',
        phone: '',
        type: '',
        status: ''
    })

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'))
        if(!session){
            navigate('../../login')
        }

        personService.getPersonById(session.id).then((resp) => {
            if(resp[0].idTipoUsuario !== 1){
                navigate('../../login');
            }
        })

        appointmentService.getAppointmentById(id).then((resp) => {
            setAppointment({
                id: resp[0].idCita,
                date: moment(resp[0].fecha).utc().format('YYYY-MM-DD'),
                hour: resp[0].hora,
                patient: resp[0].nombrePaciente + ' ' + resp[0].apPaternoPaciente + ' ' + resp[0].apMaternoPaciente,
                doctor: resp[0].nombreDoctor + ' ' + resp[0].apPaternoDoctor + ' ' + resp[0].apMaternoDoctor,
                cost: resp[0].costo,
                consulting: resp[0].idConsultorio,
                level: resp[0].piso,
                phone: resp[0].telefono,
                type: resp[0].tipoCita,
                status: resp[0].estadoCita
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
            <div className=' rounded-lg bg-violet-300 w-[80%] flex flex-row items-center justify-evenly p-5'>
                    <div className=' w-[80%] flex flex-col justify-evenly'>
                        <div className='flex flex-row justify-between'>
                            <p className='text-md'><span className=' font-bold'>Teléfono de contacto: </span>{appointment.phone}</p>
                            <p className='text-md'><span className=' font-bold'>Piso del consultorio: </span>{appointment.level}</p>
                            <p className='text-md'><span className=' font-bold'>Consultorio: </span>{appointment.consulting}</p>
                        </div>
                        <div className='flex flex-row justify-between mt-5'>
                            <p className='text-xl'><span className=' font-bold'>Doctor: </span>{appointment.doctor}</p>
                            <p className='text-xl'><span className=' font-bold'>Paciente: </span>{appointment.patient}</p>
                        </div>
                        <div className='flex flex-row justify-between mt-2'>
                            <p className='text-lg'><span className=' font-bold'>Fecha: </span>{moment(appointment.date).utc().format('YYYY-MM-DD')}</p>
                            <p className='text-lg'><span className=' font-bold'>Hora: </span>{moment(appointment.hour).utc().format('HH:mm')}</p>
                        </div>
                        <div className='flex flex-row justify-between mt-2'>
                            <p className='text-lg'><span className=' font-bold'>Costo de la cita: </span>${appointment.cost}</p>
                            <p className='text-lg'><span className=' font-bold'>Id de la cita: </span>{appointment.id}</p>
                        </div>
                        <div className='flex flex-row justify-between mt-3'>
                            <p className='text-lg'><span className=' font-bold'>Tipo de cita: </span>{appointment.type}</p>
                            <p className='text-lg'><span className=' font-bold'>Estado: </span>{appointment.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentInfo