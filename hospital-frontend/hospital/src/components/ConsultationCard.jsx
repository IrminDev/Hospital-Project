import React from 'react'

const ConsultationCard = ({ consultation, children }) => {
  return (
    <div className=' bg-violet-300 rounded-md flex flex-col w-full px-8 py-4 mt-8'>
      <div className=' flex flex-row items-center justify-between'>
        <div className=' flex flex-col items-start justify-center'>
          <p className=' text-xl font-bold text-slate-700'>{consultation.name}</p>
          <p className=' text-md font-normal text-slate-700'>Fecha: {consultation.date}</p>
          <p className=' text-md font-normal text-slate-700'>Servicios: {consultation.services}</p>
        </div>
        <div className=' flex flex-col items-end justify-center'>
          <p className=' text-xl font-bold text-slate-700'>{consultation.id}</p>
          <p className=' text-md font-normal text-slate-700'>Hora: {consultation.time}</p>
          <p className=' text-md font-normal text-slate-700'>Costo: {consultation.cost}</p>
        </div>
      </div>
      <div>
        <p className='text-md font-normal text-slate-700'>{consultation.note}</p>
      </div>
      <div className=' flex flex-row items-center justify-evenly mt-5 '>
        {children}
      </div>
    </div>
  )
}

export default ConsultationCard