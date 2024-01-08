import React from 'react'
import { useEffect, useState } from 'react'
import personService from '../services/person'
import purchaseService from '../services/purchase'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'
import ComboBox from '../components/ComboBox'
import FormInput from '../components/FormInput'
import ButtonSubmit from '../components/ButtonSubmit'
import Button from '../components/Button'
import medicineService from '../services/medicine'
import paymentService from '../services/payment'
import patientService from '../services/patient'

const PurchaseForm = () => {
    const [medicines, setMedicines] = useState([]);
    const [form, setForm] = useState({
        patient: 'default',
        payment: 'default',
        orders: [],
    });
    const [medicine, setMedicine] = useState({
        id: 'default',
        quantity: ''
    });
    const [medicinesSelected, setMedicinesSelected] = useState([]);
    const [payments, setPayments] = useState([]);
    const [patients, setPatients] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'));
        if (!session) {
            navigate('../login')
        }

        personService.getPersonById(session.id).then((resp) => {
            if (resp[0].idTipoUsuario !== 3) {
                navigate('../home')
            }
        })

        medicineService.getMedicines().then((resp) => {
            resp.map((el) => {
                setMedicines((medicines) => [...medicines, {
                    id: el.idMedicamento,
                    value: el.medicamento
                }])
            })
        })

        paymentService.getPayments().then((resp) => {
            resp.map((el) => {
                setPayments((payments) => [...payments, {
                    id: el.idMetodoPago,
                    value: el.metodoPago
                }])
            })
        })

        patientService.getPatients().then((resp) => {
            resp.map((el) => {
                setPatients((patients) => [...patients, {
                    id: el.idPersona,
                    value: el.nombre + ' ' + el.apPaterno + ' ' + el.apMaterno
                }])
            })
        })
    },[])

    const handleChange = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleOrder = (e) => {
        e.preventDefault();
        setMedicine({
            ...medicine,
            [e.target.name]: e.target.value
        })
    }

    const handleAddMedicine = (e) => {
        e.preventDefault();

        setMedicinesSelected(medicinesSelected.concat(
            medicines.filter(med => {
                return med.id === parseInt(medicine.id)
            })
        ))

        setMedicines((medicines) => medicines.filter((el) => el.id !== parseInt(medicine.id)))

        setForm({
            ...form,
            orders: [...form.orders, { id: medicine.id, quantity: medicine.quantity }]
        })

        setMedicine({
            id: 'default',
            quantity: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        purchaseService.createPurchase(form).then((resp) => {
            if (resp.status === 200) {
                navigate('../receptionist/purchases');
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
                    <h1 className=' text-3xl text-center text-blue-500 mb-5'>Registrar compra</h1>
                    <p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Registra una compra hecha por un paciente.</p>
                    <p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Los medicamentos de la compra aparecerán aquí:
                            {medicinesSelected.map((el) => {
                                return (
                                    <span className=' font-bold' key={el.id}>{el.value} </span>
                                )
                            })}
                    </p>
                    <p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Si hubo un error al agregar alguna especialidad que no era, recargue la página y llene el formulario de nuevo.</p>
                    <form onSubmit={handleSubmit} className=' w-full relative mt-7 mx-auto mb-0'>
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                            <ComboBox value={form.patient} name={'patient'} handleChange={handleChange} placeholder={'Paciente'} options={patients} required={true} />
                            <ComboBox value={form.payment} name={'payment'} handleChange={handleChange} placeholder={'Metódo de pago'} options={payments} required={true} />
                        </div>
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                            <ComboBox value={medicine.id} name={'id'} handleChange={handleOrder} placeholder={'Medicamento'} options={medicines} required={true} />
                            <FormInput value={medicine.quantity} name={'quantity'} handleChange={handleOrder} min={0} placeholder={'Cantidad'} />
                        </div>
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                            <Button handleClick={handleAddMedicine} text={'Agregar medicamento'} />
                            <ButtonSubmit text={'Registrar compra'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PurchaseForm