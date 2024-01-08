import React from 'react'
import { useEffect, useState } from 'react'
import personService from '../services/person'
import purchaseService from '../services/purchase'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'
import CountCard from '../components/CountCard'
import PurchaseCard from '../components/PurchaseCard'
import moment from 'moment'

const Purchases = () => {
    const [purchases, setPurchases] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'));
        if (!session) {
            navigate('../login')
        }

        personService.getPersonById(session.id).then((resp) => {
            if (resp[0].idTipoUsuario !== 1) {
                navigate('../home')
            }
        })

        purchaseService.getPurchaseByUser(session.id).then((resp) => {
            resp.map(purchase => {
                setPurchases(purchases => [...purchases, {
                    id: purchase.idCompra,
                    idPatient: purchase.idPersona,
                    name: purchase.nombre,
                    date: moment(purchase.fecha).utc().format('YYYY-MM-DD'),
                    time: moment(purchase.hora).utc().format('HH:mm'),
                    payment: purchase.metodoPago,
                    orders: purchase.pedidos.map(order => {
                        return {
                            medicine: order.medicamento,
                            quantity: order.cantidad,
                            cost: order.costo
                        }
                    })
                }])
            })
        })
    }, [])

    return (
        <div>
            <Header>
                <HeaderLink text={'Citas'} url={'../home'} />
                <HeaderLink text={'Consultas'} url={'../patient/consultations'} />
                <HeaderLink text={'Compras'} url={'../patient/purchases'} />
                <HeaderLink text={'Perfil'} url={'../patient/profile'} />
            </Header>

            <div className=' flex flex-col items-center justify-center w-full py-8 mb-10'>
                <div className=' rounded-lg bg-blue-300 mt-28 w-[80%] flex flex-row items-center justify-start px-5 py-3'>
                    <div className=' w-[100%] flex flex-row justify-evenly'>
                        <CountCard count={purchases.length} text={'Compras'} />
                    </div>
                </div>

                <div className=' flex flex-col items-center justify-center w-[80%]'>
                    {purchases.map((purchase) => 
                        <PurchaseCard key={purchase.id} purchase={purchase} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Purchases