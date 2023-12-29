import React from 'react'
import { Link } from 'react-router-dom'	

const AppointmentCard = ({ appointment }) => {
  return (
    <div className=' bg-violet-300 rounded-md flex flex-col w-full px-8 py-4 mt-8'>
      <div className=' flex flex-row items-center justify-between'>
        <div className=' flex flex-col items-start justify-center'>
          <p className=' text-xl font-bold text-slate-700'>{appointment.name}</p>
          <p className=' text-md font-normal text-slate-700'>{appointment.date}</p>
          <p className=' text-md font-normal text-slate-700'>{appointment.type}</p>
        </div>
        <div className=' flex flex-col items-end justify-center'>
          <p className=' text-xl font-bold text-slate-700'>{appointment.id}</p>
          <p className=' text-md font-normal text-slate-700'>{appointment.time}</p>
          <p className=' text-md font-normal text-slate-700'>{appointment.status}</p>
        </div>
      </div>
      <div className=' flex flex-row items-center justify-evenly mt-4'>
        <Link to={'./'} className=' w-1/3 p-2 rounded-md bg-violet-600 text-slate-200 font-bold'>Cancelar</Link>
        <Link to={'./'} className=' w-1/3 p-2 rounded-md bg-violet-600 text-slate-200 font-bold'>Editar</Link>
      </div>
    </div>
  )
}

export default AppointmentCard