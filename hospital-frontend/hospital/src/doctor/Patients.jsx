import React from 'react'
import { useEffect, useState } from 'react'
import personService from '../services/person'
import patientService from '../services/patient'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'
import CountCard from '../components/CountCard'
import Button from '../components/Button'
import PatientCard from '../components/PatientCard'
import ButtonLink from '../components/ButtonLink'

const Patients = () => {
    const [patients, setPatients] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'));
        if (!session) {
            navigate('../login')
        }

        personService.getPersonById(session.id).then((resp) => {
            if (resp[0].idTipoUsuario !== 2) {
                navigate('../home')
            }
        })

        patientService.getPatients().then((resp) => {
            resp.map(patient => {
                setPatients(patients => [...patients, {
                    id: patient.idPersona,
                    name: patient.nombre,
                    fatherLastName: patient.apPaterno,
                    motherLastName: patient.apMaterno,
                    curp: patient.curp,
                    mail: patient.correo,
                    user: patient.usuario,
                    height: patient.altura,
                    weight: patient.peso,
                    type: patient.idTipoUsuario
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

            <div className=' flex flex-col items-center justify-start w-full py-8'>
                <div className=' rounded-lg bg-blue-300 mt-28 w-[80%] flex flex-row items-center justify-start px-5 py-3'>
                    <div className=' w-[100%] flex flex-row justify-evenly'>
                        <CountCard count={patients.length} text={'Pacientes'} />
                    </div>
                </div>
                <div className=' w-[85%] mt-5'>
                    {patients.map((patient) => {
                        return <PatientCard key={patient.id} patient={patient} >
                            <ButtonLink text={'Ver historial médico'} url={'../doctor/medical-history/' + patient.id}/> 
                        </PatientCard>
                    })}
                </div>
            </div>

        </div>
    )
}

export default Patients