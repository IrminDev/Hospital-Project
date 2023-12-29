import React from 'react'
import { Link } from 'react-router-dom'

const ConsultationCard = ({ consultation }) => {
  return (
    <div className=' bg-violet-300 rounded-md flex flex-col w-full px-8 py-4 mt-8'>
      <div className=' flex flex-row items-center justify-between'>
        <div className=' flex flex-col items-start justify-center'>
          <p className=' text-xl font-bold text-slate-700'>{consultation.doctor}</p>
          <p className=' text-md font-normal text-slate-700'>{consultation.date}</p>
          <p className=' text-md font-normal text-slate-700'>{consultation.type}</p>
        </div>
        <div className=' flex flex-col items-end justify-center'>
          <p className=' text-xl font-bold text-slate-700'>{consultation.id}</p>
          <p className=' text-md font-normal text-slate-700'>{consultation.time}</p>
          <p className=' text-md font-normal text-slate-700'>{consultation.status}</p>
        </div>
      </div>
    </div>
  )
}

export default ConsultationCard