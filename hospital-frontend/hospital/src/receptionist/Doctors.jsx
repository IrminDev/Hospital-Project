import React from 'react'
import { useEffect, useState } from 'react'
import personService from '../services/person'
import doctorService from '../services/doctor'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'
import CountCard from '../components/CountCard'
import Button from '../components/Button'
import ButtonLink from '../components/ButtonLink'
import moment from 'moment'
import DoctorCard from '../components/DoctorCard'

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'));
        if (!session) {
            navigate('../login')
        }

        personService.getPersonById(session.id).then((resp) => {
            if (resp[0].idTipoUsuario !== 3) {
                navigate('../home')
            }
        })

        doctorService.getDoctors().then((resp) => {
            resp.map(doctor => {
                setDoctors(doctors => [...doctors, {
                    id: doctor.idPersona,
                    name: doctor.nombre,
                    fatherLastName: doctor.apPaterno,
                    motherLastName: doctor.apMaterno,
                    curp: doctor.curp,
                    mail: doctor.correo,
                    user: doctor.usuario,
                    specialities: doctor.especialidad,
                    professionalId: doctor.cedula,
                    entryTime: moment(doctor.horaInicio).utc().format('HH:mm'),
                    exitTime: moment(doctor.horaFin).utc().format('HH:mm'),
                }])
            })
        
        })
    }, [])

    const handleDelete = (e,id) => {
        e.preventDefault()

        doctorService.deleteDoctor(id).then((resp) => {
            if (resp.status === 204) {
                setDoctors(doctors.filter((doctor) => doctor.id !== id))
            }   
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
                    <div className=' w-[50%] flex flex-row justify-evenly'>
                        <CountCard count={doctors.length} text={'Doctores'} />
                    </div>
                    <div className=' w-[40%] flex items-center justify-between'>
                        <ButtonLink url={'../receptionist/register-doctor'} text={'Registrar un doctor'} />
                    </div>
                </div>
                <div className=' w-[85%] mt-5'>
                    {doctors.map((doctor) => {
                        return <DoctorCard key={doctor.id} doctor={doctor} >
                            <Button text={'Eliminar'} handleClick={e => handleDelete(e, doctor.id)} />
                        </DoctorCard>
                    })}
                </div>
            </div>

        </div>
    )
}

export default Doctors