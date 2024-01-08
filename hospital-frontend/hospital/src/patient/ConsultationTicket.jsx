import React from 'react'
import { useEffect, useState } from 'react'
import personService from '../services/person'
import consultationService from '../services/consultation'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'
import moment from 'moment'

const ConsultationTicket = () => {
    const { id } = useParams()
    
    const navigate = useNavigate()

    const [consultation, setConsultation] = useState({
        id: 0,
        date: '',
        hour: '',
        doctor: '',
        patient: '',
        cost: 0,
        note: '',
        services: []
    })

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'))
        if(!session){
            navigate('../../login')
        }

        personService.getPersonById(session.id).then((resp) => {
            if(resp[0].idTipoUsuario !== 1){
                navigate('/login');
            }
        })

        consultationService.getConsultationById(id).then((resp) => {
            setConsultation({
                id: resp[0].idConsulta,
                date: resp[0].fecha,
                hour: resp[0].hora,
                doctor: resp[0].nombreDoctor,
                patient: resp[0].nombrePaciente,
                cost: resp[0].costo,
                note: resp[0].notaMedica,
                services: resp[0].servicios.map(service => {
                    return {
                        name: service.servicio,
                        cost: service.costo
                    }
                })
            })
        })
    }, [])

    return (
        <div>
            <Header>
                <HeaderLink text={'Citas'} url={'../home'} />
                <HeaderLink text={'Consultas'} url={'/consultations'} />
                <HeaderLink text={'Compras'} url={'../patient/purchases'} />
                <HeaderLink text={'Perfil'} url={'../patient/profile'} />
            </Header>
            
            <div className=' w-full mt-32 flex flex-col items-center justify-start'>
                <div className=' rounded-lg bg-violet-300 w-[80%] flex flex-row items-center justify-evenly p-5'>
                    <div className=' w-[80%] flex flex-col justify-evenly'>
                        <div className='flex flex-row justify-between'>
                            <p className='text-xl'><span className=' font-bold'>Doctor: </span>{consultation.doctor}</p>
                            <p className='text-xl'><span className=' font-bold'>Paciente: </span>{consultation.patient}</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className='text-lg'><span className=' font-bold'>Fecha: </span>{moment(consultation.date).utc().format('YYYY-MM-DD')}</p>
                            <p className='text-lg'><span className=' font-bold'>Hora: </span>{moment(consultation.hour).utc().format('HH:mm')}</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className='text-lg'><span className=' font-bold'>Costo de consulta: </span>${consultation.cost}</p>
                            <p className='text-lg'><span className=' font-bold'>Id de consulta: </span>{consultation.id}</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className='text-lg'><span className=' font-bold'>Nota médica: </span>{consultation.note}</p>
                        </div>
                        <div className='flex flex-row justify-between mt-8'>
                            <p className='text-xl font-bold w-[20%]'>Servicios:</p>
                            <div className='flex flex-col mr-16 w-[50%]'>
                                {consultation.services.map(service => {
                                    return (
                                        <div key={service.name} className='flex flex-row justify-between'>
                                            <p className='text-md'><span className=' font-bold'>{service.name}: </span></p>
                                            <p className='text-md'>${service.cost}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className=' flex flex-row justify-star items-center mt-8'>
                            <p className=' text-2xl font-normal'><span className=' font-extrabold'>Total: </span> ${
                                consultation.services.reduce((total, service) => {
                                    return total + service.cost
                                }, consultation.cost)
                            } </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsultationTicket