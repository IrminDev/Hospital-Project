import React from 'react'
import ButtonLink from './ButtonLink'

const MedicineCard = ({medicine}) => {
    return (
        <div className=' bg-violet-300 rounded-md flex flex-col px-8 py-4 mt-8 w-full'>
            <div className=' flex flex-row items-center justify-start'>
                <div className=' flex flex-col items-start justify-center'>
                    <p className=' text-2xl font-bold text-slate-700'>ID del medicamento: <span className=' font-normal'>{medicine.id}</span></p>
                </div>
            </div>
            <div className=' flex flex-row items-end justify-between mt-4'>
                <p className=' text-lg font-base text-slate-700'><span className=' font-semibold'>Medicamento: </span>{medicine.medicine}</p>
                <p className=' text-lg font-base text-slate-700'><span className=' font-semibold'>Precio: $</span>{medicine.price}</p>
            </div>
            <div className=' flex flex-row items-end justify-between mt-4'>
                <p className=' text-md font-base text-slate-700'><span className=' font-semibold'>Medicamento: </span>{medicine.quantity}</p>
            </div>
            <div className=' flex flex-row items-end justify-between mt-4'>
                <ButtonLink url={'../receptionist/modify-medicine/'+medicine.id} text={'Modificar stock'} />
            </div>
        </div>
    )
}

export default MedicineCard