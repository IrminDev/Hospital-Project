import React from 'react'
import { useEffect, useState } from 'react'
import personService from '../services/person'
import PrescriptionService from '../services/prescription'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'
import PrescriptionCard from '../components/PrescriptionCard'
import { useNavigate, useParams } from 'react-router-dom'

const Prescription = () => {
    const { id } = useParams()
    
    const navigate = useNavigate()

    const [prescription, setPrescription] = useState({
        id: '',
        tip: '',
        supplies: []
    })

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'))
        if(!session){
            navigate('../../login')
        }

        personService.getPersonById(session.id).then((resp) => {
            if(resp[0].idTipoUsuario !== 2){
                navigate('/login')
            }
        })

        PrescriptionService.getPrescriptionById(id).then((resp) => {
            setPrescription({
                id: resp[0].idReceta,
                tip: resp[0].recomendaciones,
                supplies: resp[0].suministro.map((s) => {
                    return {
                        medicine: s.medicamento,
                        quantity: s.cantidad,
                        description: s.descripcion
                    }
                })
            })
        })
    }, [])
    
    return (
        <div>
            <Header>
                <HeaderLink text={'Citas'} url={'../home'} />
                <HeaderLink text={'Consultas'} url={'../doctor/consultations'} />
                <HeaderLink text={'Pacientes'} url={'../doctor/medical-history'} />
                <HeaderLink text={'Perfil'} url={'../doctor/profile'} />
            </Header>

            <div className=' w-full mt-32 flex flex-col items-center justify-start'>
                <PrescriptionCard prescription={prescription} />
            </div>
        </div>
    )
}

export default Prescription