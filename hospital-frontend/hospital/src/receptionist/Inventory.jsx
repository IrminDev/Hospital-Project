import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'
import medicineService from '../services/medicine'
import personService from '../services/person'
import { useNavigate } from 'react-router-dom'
import CountCard from '../components/CountCard'
import MedicineCard from '../components/MedicineCard'

const Inventory = () => {
    const [medicines, setMedicines] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'));
        if (!session) {
            navigate('../../login')
        }

        personService.getPersonById(session.id).then((resp) => {
            if (resp[0].idTipoUsuario !== 3) {
                navigate('../home')
            }
        })

        medicineService.getMedicines().then((res) => {
            res.map((el) => (
                setMedicines((medicines) => [...medicines, {
                    id: el.idMedicamento,
                    medicine: el.medicamento,
                    quantity: el.cantidad,
                    price: el.precio,
                }])
            ))
        })
    },[])

    return (
        <div>
            <Header>
                <HeaderLink text={'Citas'} url={'../home'} />
                <HeaderLink text={'Compras'} url={'../receptionist/purchases'} />
                <HeaderLink text={'Inventario'} url={'../receptionist/inventory'} />
                <HeaderLink text={'Doctores'} url={'../receptionist/doctors'} />
                <HeaderLink text={'Pacientes'} url={'../receptionist/patients'} />
                <HeaderLink text={'Perfil'} url={'../receptionist/profile'} />
            </Header>

            <div className=' flex flex-col items-center justify-start w-full py-8'>
                <div className=' rounded-lg bg-blue-300 mt-28 w-[80%] flex flex-row items-center justify-start px-5 py-3'>
                    <div className=' w-[100%] flex flex-row justify-evenly'>
                        <CountCard count={medicines.length} text={'Medicamentos'} />
                    </div>
                </div>
                <div className=' w-[85%] mt-5'>
                    {medicines.map((medicine) => {
                        return <MedicineCard key={medicine.id} medicine={medicine} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Inventory