import React from 'react'

const DoctorCard = ({doctor, children}) => {
    return (
        <div className=' bg-violet-300 rounded-md flex flex-col w-full px-8 py-4 mt-8'>
            <div className= 'flex flex-row items-center justify-between'>
                <div className=' flex flex-col items-start justify-start '>
                    <p className=' font-medium text-xl text-slate-700'><span className=' font-semibold'>Nombre: </span>{doctor.name + ' ' + doctor.fatherLastName+ ' ' + doctor.motherLastName}</p>
                    <p className=' font-medium text-xl text-slate-700'><span className=' font-semibold'>Curp: </span>{doctor.curp}</p>
                    <p className=' font-medium text-xl text-slate-700'><span className=' font-semibold'>Cedula: </span>{doctor.professionalId}</p>
                </div>

                <div>
                    <p className=' font-medium text-xl text-slate-700'><span className=' font-semibold'>ID: </span>{doctor.id}</p>
                    <p className=' font-medium text-xl text-slate-700'><span className=' font-semibold'>Hora de entrada: </span>{doctor.entryTime}</p>
                    <p className=' font-medium text-xl text-slate-700'><span className=' font-semibold'>Hora de salida: </span>{doctor.exitTime}</p>
                </div>
            </div>
            <div className=' mt-5 flex flex-row items-center justify-evenly w-full'>
                {children}
            </div>
        </div>
    )
}

export default DoctorCard