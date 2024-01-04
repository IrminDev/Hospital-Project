import React from 'react'


const PrescriptionCard = ({ prescription }) => {
    return (
        <div className=' bg-violet-300 rounded-md flex flex-col px-8 py-4 mt-8 w-[85%]'>
            <div className=' flex flex-row items-center justify-start'>
                <div className=' flex flex-col items-start justify-center'>
                    <p className=' text-2xl font-bold text-slate-700'>Receta de la consulta: <span className=' font-normal'>{prescription.id }</span></p>
                </div>
            </div>
            <div className=' flex flex-row items-end justify-start mt-4'>
                <p className=' text-md font-base text-slate-700'>Recomendaciones: {prescription.tip}</p>
            </div>
            <div className=' flex flex-row items-end justify-start mt-6'>
                <p className=' text-xl font-bold text-slate-700'>Medicina recetada: </p>
            </div>
            {prescription.supplies.map((supply) => 
                <div key={supply.medicine} className=' bg-violet-400 rounded-md px-4 py-2 mt-4 flex flex-col items-end justify-center'>
                    <div className=' flex flex-row items-center justify-between w-full'>
                        <p className=' text-lg font-bold text-slate-700'>Medicamento: <span className=' font-normal'>{supply.medicine}</span></p>
                        <p className=' text-lg font-bold text-slate-700'> Cantidad: <span className=' font-normal'>{supply.quantity}</span></p>
                    </div>
                    <div className=' flex flex-row items-center justify-start w-full'>
                        <p className=' text-md font-semibold text-slate-700'>Instrucciones: <span className=' font-normal'>{supply.description}</span></p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PrescriptionCard