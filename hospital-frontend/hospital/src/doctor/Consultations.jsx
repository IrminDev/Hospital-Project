import React from 'react'
import { useEffect, useState } from 'react'
import personService from '../services/person'
import consultationService from '../services/consultation'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'
import CountCard from '../components/CountCard'
import ConsultationCard from '../components/ConsultationCard'
import moment from 'moment'
import ButtonLink from '../components/ButtonLink'

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('user'));
    if(!session){
      navigate('../../login');
    }

    personService.getPersonById(session.id).then((resp) => {
      if(resp[0].idTipoUsuario !== 2){
        navigate('/login');
      }
    })

    consultationService.getConsultationsForUser(session.id).then((resp) => {
      resp.map((el) => (
        setConsultations((consultations) => [...consultations, {
          id: el.idConsulta,
          name: el.nombrePaciente,
          date: moment(el.fechaHora).format('DD/MM/YYYY'),
          time: moment(el.fechaHora).format('HH:mm'),
          note: el.notaMedica,
          cost: el.costoTotal,
          services: el.servicios,
        }])
      ))
    })
  }, []);
  return (
    <div>
      <Header>
          <HeaderLink text={'Citas'} url={'../home'} />
          <HeaderLink text={'Consultas'} url={'../doctor/consultations'} />
          <HeaderLink text={'Pacientes'} url={'../doctor/patients'} />
          <HeaderLink text={'Perfil'} url={'../doctor/profile'} />
      </Header>

      <div className=' w-full mt-32 flex flex-col items-center justify-start'>
          <div className=' rounded-lg bg-blue-300 w-[80%] flex flex-row items-center justify-evenly p-5'>
              <div className=' w-[80%] flex flex-row justify-evenly'>
                  <CountCard count={consultations.length} text={'Consultas'} />
                  <div className=' w-[50%]'>
                    <ButtonLink text={'Finalizar consulta'} url={'../doctor/consultation-form'} />
                  </div>
              </div>
          </div>
          <div className=' w-[85%] mt-5'>
              {consultations.map((consultation) => {
                  return <ConsultationCard key={consultation.id} consultation={consultation}>
                      <div className=' w-[47%]'>
                        <ButtonLink text={'Generar receta'} url={`../doctor/prescription-form/${consultation.id}`} />
                      </div>
                      <div className=' w-[47%]'>
                        <ButtonLink text={'Ver receta'} url={`../doctor/prescription/${consultation.id}`} />
                      </div>
                  </ConsultationCard>
              })}
          </div>
      </div>
    </div>
  )
}

export default Consultations