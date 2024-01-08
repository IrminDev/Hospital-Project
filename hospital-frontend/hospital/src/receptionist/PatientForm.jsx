import React from 'react'
import { useEffect, useState } from 'react'
import personService from '../services/person';
import Header from '../components/Header';
import HeaderLink from '../components/HeaderLink';
import ComboBox from '../components/ComboBox';
import FormInput from '../components/FormInput';
import ButtonSubmit from '../components/ButtonSubmit';
import { useNavigate } from 'react-router-dom';
import signUpService from '../services/signup';
import bloodTypesService from '../services/bloodTypes';

const PatientForm = () => {
    const [form, setForm] = useState({
        name: '',
        fatherLastName: '',
        motherLastName: '',
        curp: '',
        mail: '',
        height: 0,
        weight: 0,
        bloodType: '',
        user: '',
        password: '',
    });
    const [bloodType, setBloodType] = useState([])
    
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

        bloodTypesService.getBloodTypes().then((res) => {
            res.map((el) => (
                setBloodType((bloodType) => [...bloodType, {id: el.idTipoSangre, value: el.tipoSangre}])
            ))
        })
    },[])

    const handleChange = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await signUpService.signUp(form)
            if (resp.ok = true) {
                navigate('../home')
            }
        } catch (error) {
            console.log(error)
        }
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
                    <h1 className=' text-3xl text-center text-blue-500 mb-5'>Registro de un paciente</h1>
                    <p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Registra a un paciente en el sistema. Recuerda tener cuidado al proporcionarle sus credenciales</p>
                    <form onSubmit={handleSubmit} className=' w-full relative mt-7 mx-auto mb-0'>
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                            <FormInput value={form.name} name={'name'} handleChange={handleChange} placeholder={'Nombre'} required={true} />
                            <FormInput value={form.fatherLastName} name={'fatherLastName'} handleChange={handleChange} required={true} placeholder={'Apellido paterno'} />
                        </div>
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                            <FormInput value={form.motherLastName} name={'motherLastName'} handleChange={handleChange} required={true} placeholder={'Apellido materno'} />
                            <FormInput value={form.curp} name={'curp'} handleChange={handleChange} required={true} placeholder={'CURP'} />
                        </div>
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                            <FormInput value={form.mail} name={'mail'} handleChange={handleChange} required={true} placeholder={'Correo electrónico'} />
                            <FormInput value={form.user} name={'user'} handleChange={handleChange} required={true} placeholder={'Usuario'} />
                        </div>
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                            <FormInput value={form.password} name={'password'} handleChange={handleChange} required={true} placeholder={'Contraseña'} />
                            <FormInput name={'height'} type={'number'} handleChange={handleChange} required={true} placeholder={'Altura (cm)'} min={0} />
                        </div>
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                            <FormInput name={'weight'} type={'number'} handleChange={handleChange} required={true} placeholder={'Altura (cm)'} min={0} />
                            <ComboBox name={'bloodType'} handleChange={handleChange} placeholder={'Tipo de sangre'} options={bloodType} required={true} />
                        </div>             
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                            <ButtonSubmit text={'Registrar paciente'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PatientForm