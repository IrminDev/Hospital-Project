import React from 'react'
import moment from 'moment'

const AppointmentCard = ({ appointment, children }) => {
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
      <div className=' flex flex-row items-center justify-evenly mt-5'>
        {children}
      </div>
    </div>
  )
}

export default AppointmentCard