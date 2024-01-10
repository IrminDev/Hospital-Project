import React from 'react'
import { useEffect, useState } from 'react'
import personService from '../services/person'
import patientService from '../services/patient'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'
import moment from 'moment'

const MedicalHistory = () => {
    const [historial, setHistorial] = useState({
        id: '',
        namePatient: '',
        history: [],
    });

    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'))
        if(!session){
            navigate('../../login')
        }

        personService.getPersonById(session.id).then((resp) => {
            if(resp[0].idTipoUsuario !== 2){
                navigate('../../login')
            }
        })

        patientService.getMedicalHistory(id).then((resp) => {
          console.log(resp);
            if(resp.length > 0){
                setHistorial({
                  id: resp[0].idPaciente,
                  namePatient: resp[0].nombrePaciente,
                  history: resp[0].historial.map((d) => {
                      return {
                          nameDoctor: d.nombreDoctor,
                          date: d.fecha,
                          diagnostic: d.diagnostico,
                          consulting: d.consultorio,
                          cost: d.costoTotal
                      }
                  })
                })
            }
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

            <div className=' flex flex-col items-center w-full py-8 justify-start'>
              <div className=' bg-violet-300 rounded-md flex flex-col px-8 py-4 mt-32 w-[85%]'>
                <div className=' flex flex-row items-center justify-start'>
                    <div className=' flex flex-col items-start justify-center'>
                        <p className=' text-2xl font-bold text-slate-700'>ID del paciente: <span className=' font-normal'>{historial.id }</span></p>
                    </div>
                </div>
                <div className=' flex flex-row items-end justify-start mt-4'>
                    <p className=' text-md font-base text-slate-700'>Nombre del paciente: {historial.namePatient}</p>
                </div>
                <div className=' flex flex-row items-end justify-start mt-6'>
                    <p className=' text-xl font-bold text-slate-700'>Historial médico: </p>
                </div>
                {historial.history.map((element) => 
                    <div key={element.diagnostic} className=' bg-violet-400 rounded-md px-4 py-2 mt-4 flex flex-col items-end justify-center'>
                        <div className=' flex flex-row items-center justify-between w-full'>
                            <p className=' text-lg font-bold text-slate-700'>Nombre del doctor: <span className=' font-normal'>{element.nameDoctor}</span></p>
                            <p className=' text-lg font-bold text-slate-700'>Fecha: <span className=' font-normal'>{moment(element.date).utc().format('YYYY-MM-DD HH:mm')}</span></p>
                        </div>
                        <div className=' flex flex-row items-center justify-between w-full'>
                            <p className=' text-lg font-bold text-slate-700'>Consultorio: <span className=' font-normal'>{element.consulting}</span></p>
                            <p className=' text-lg font-bold text-slate-700'>Costo: <span className=' font-normal'>$ {element.cost}</span></p>
                        </div>
                        <div className=' flex flex-row items-center justify-start w-full'>
                            <p className=' text-md font-semibold text-slate-700'>Diagnóstico: <span className=' font-normal'>{element.diagnostic}</span></p>
                        </div>
                    </div>
                )}
            </div>
            </div>
      </div>
    )
}

export default MedicalHistory