import React from 'react'

const PatientCard = ({patient, children}) => {
  return (
    <div className=' bg-violet-300 rounded-md flex flex-col w-full px-8 py-4 mt-8'>
        <div className= 'flex flex-row items-center justify-between'>
            <div className=' flex flex-col items-start justify-start '>
                <p className=' font-medium text-xl text-slate-700'><span className=' font-semibold'>Nombre: </span>{patient.name + ' ' + patient.fatherLastName+ ' ' + patient.motherLastName}</p>
                <p className=' font-medium text-xl text-slate-700'><span className=' font-semibold'>Curp: </span>{patient.curp}</p>
                <p className=' font-medium text-xl text-slate-700'><span className=' font-semibold'>Correo: </span>{patient.mail}</p>
            </div>

            <div>
                <p className=' font-medium text-xl text-slate-700'><span className=' font-semibold'>ID: </span>{patient.id}</p>
                <p className=' font-medium text-xl text-slate-700'><span className=' font-semibold'>Peso: </span>{patient.weight}</p>
                <p className=' font-medium text-xl text-slate-700'><span className=' font-semibold'>Altura: </span>{patient.height}</p>
            </div>
        </div>
        <div className=' mt-5 flex flex-row items-center justify-evenly w-full'>
            {children}
        </div>
    </div>
  )
}

export default PatientCard