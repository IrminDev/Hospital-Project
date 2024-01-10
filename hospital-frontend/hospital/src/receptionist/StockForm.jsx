import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ButtonSubmit from '../components/ButtonSubmit';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import HeaderLink from '../components/HeaderLink';
import medicineService from '../services/medicine'
import personService from '../services/person'

const StockForm = () => {
    const [medicine, setMedicine] = useState({
        medicine: '',
        quantity: 0,
        id: 0
    });

    const { id } = useParams();

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

        medicineService.getMedicineById(id).then((res) => {
            setMedicine({
                medicine: res[0].medicamento,
                quantity: res[0].cantidad,
                id: res[0].idMedicamento
            })
        })
    },[])

    const handleOrder = (e) => {
        setMedicine({
            ...medicine,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        medicineService.updateMedicine(medicine).then((res) => {
            if (res.status === 200) {
                navigate('../receptionist/inventory')
            }
        })
    }

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

            <div className=' h-[100vh] max-sm:h-[145vh] bg-slate-100'>
                <div className=' bg-blue-50 w-[90%] px-8 py-12 translate-x-[-50%] translate-y-[-50%] absolute left-1/2 top-1/2 mt-24 mb-24 max-md:mt-52 rounded-2xl border-2 border-blue-400'>
                    <h1 className=' text-3xl text-center text-blue-500 mb-5'>Modificar inventario</h1>
                    <p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Modifica el inventario del medicameto <span>{medicine.medicine}</span></p>
                    <form onSubmit={handleSubmit} className=' w-full relative mt-7 mx-auto mb-0'>
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                            <FormInput value={medicine.quantity} type={'number'} name={'quantity'} handleChange={handleOrder} min={0} placeholder={'Cantidad'} />
                            <ButtonSubmit text={'Registrar inventario'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StockForm