import React from 'react'

const PurchaseCard = ({ purchase }) => {
    return (
        <div className=' bg-violet-300 rounded-md flex flex-col px-8 py-4 mt-8 w-full'>
            <div className=' flex flex-row items-center justify-start'>
                <div className=' flex flex-col items-start justify-center'>
                    <p className=' text-2xl font-bold text-slate-700'>ID de compra: <span className=' font-normal'>{purchase.id}</span></p>
                </div>
            </div>
            <div className=' flex flex-row items-end justify-between mt-4'>
                <p className=' text-md font-base text-slate-700'><span className=' font-semibold'>Paciente: </span>{purchase.name}</p>
                <p className=' text-md font-base text-slate-700'><span className=' font-semibold'>ID del paciente: </span>{purchase.idPatient}</p>
            </div>
            <div className=' flex flex-row items-end justify-between mt-4'>
                <p className=' text-md font-base text-slate-700'><span className=' font-semibold'>Fecha de compra: </span>{purchase.date} {purchase.time}</p>
                <p className=' text-md font-base text-slate-700'><span className=' font-semibold'>Método de pago: </span>{purchase.payment}</p>
            </div>
            <div className=' flex flex-row items-end justify-start mt-6'>
                <p className=' text-xl font-bold text-slate-700'>Medicamentos comprados: </p>
            </div>
            <div className=' bg-violet-400 rounded-md px-4 py-2 mt-4 flex flex-col items-end justify-center'>
                <div className=' flex flex-row items-center justify-between w-full'>
                    <p className=' text-lg font-bold text-slate-700'>Medicamento</p>
                    <p className=' text-lg font-bold text-slate-700'>Cantidad</p>
                    <p className=' text-lg font-bold text-slate-700'>Costo</p>
                </div>
                {purchase.orders.map((order) => 
                    <div key={order.medicine} className=' flex flex-row items-center justify-between w-full'>
                        <p className=' text-lg font-normal text-slate-700'>{order.medicine}</p>
                        <p className=' text-lg font-normal text-slate-700'>{order.quantity}</p>
                        <p className=' text-lg font-normal text-slate-700'>$ {order.cost}</p>
                    </div>
                )}
            </div>

            <div className=' flex flex-row items-end justify-start mt-6'>
                <p className=' text-xl font-bold text-slate-700'>Total: $ {
                    purchase.orders.reduce((total, order) => {
                        return total + order.cost
                    }, 0)
                }</p>
            </div>
        </div>
    )
}

export default PurchaseCard