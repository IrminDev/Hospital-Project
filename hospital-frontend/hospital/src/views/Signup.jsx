import React, { useEffect } from 'react'
import FormInput from '../components/FormInput'
import { useState } from 'react'
import ButtonSubmit from '../components/ButtonSubmit'
import ComboBox from '../components/ComboBox'
import { Link } from 'react-router-dom'
import bloodTypesService from '../services/bloodTypes'
import signUpService from '../services/signup'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    return (
        <div className="flex justify-between items-center w-[100%] h-[100vh]">
            <div className=" flex items-center justify-center w-[50%] flex-col">
                <SignUpForm />
            </div>
            <div className=" bg-signup bg-cover bg-no-repeat bg-center w-[50%] h-[100%]">
            </div>
        </div>
    )
}

const SignUpForm = () => {
    const navigate = useNavigate();

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
    const [bloodType, setBloodType] = useState([]);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/home')
        }
        bloodTypesService.getBloodTypes().then((res) => {
            res.map((el) => (
                setBloodType((bloodType) => [...bloodType, {id: el.idTipoSangre, value: el.tipoSangre}])
            ))
        })
    }, [])

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
                const user = {
                    token: resp.token,
                    id: resp.id,
                }
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/home')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className=" flex flex-col items-center w-[100%]">
                <h1 className=" text-4xl mb-10 text-blue-500">Registro</h1>
                <p className=" text-md w-[90%] mb-5 text-center">Regístrate con tus datos para poder acceder al sistema.</p>
                <form onSubmit={handleSubmit} className=" w-[100%] flex items-center justify-center flex-col px-[4rem]">
                    <FormInput name={'name'} type={'text'} required={true} placeholder={'Nombre *'} handleChange={handleChange} />
                    <FormInput name={'fatherLastName'} type={'text'} required={true} placeholder={'Apellido paterno *'} handleChange={handleChange} />
                    <FormInput name={'motherLastName'} type={'text'} required={false} placeholder={'Apellido materno'} handleChange={handleChange} />
                    <FormInput name={'curp'} type={'text'} required={false} placeholder={'CURP'} handleChange={handleChange} />
                    <FormInput name={'user'} type={'text'} required={true} placeholder={'Nombre de usuario *'} handleChange={handleChange} />
                    <FormInput name={'mail'} type={'mail'} required={true} placeholder={'Correo electrónico *'} handleChange={handleChange} />
                    <FormInput name={'password'} type={'password'} required={true} placeholder={'Contraseña *'} handleChange={handleChange} />
                    <div className=' w-full flex flex-row justify-between'>
                        <div className=' w-[48%]'>
                            <FormInput name={'height'} type={'number'} required={true} placeholder={'Estatura (cm) *'} handleChange={handleChange} />
                        </div>
                        <div className=' w-[48%]'>
                            <FormInput name={'weight'} type={'number'} required={true} placeholder={'Peso (kg) *'} handleChange={handleChange} />
                        </div>
                    </div>
                    <div className=' w-full flex flex-row justify-between'>
                        <div className=' w-[40%]'>
                            <ComboBox placeholder={'Tipo de sangre *'} required={true} handleChange={ handleChange } options={bloodType} name={'bloodType'} />
                        </div>
                        <div className=' w-[57%]'>
                            <ButtonSubmit text={'Registrarse'} />
                        </div>
                    </div>
                </form>
                <p className=" w-[90%] text-md text-center mt-5">¿Ya tienes una cuenta? <Link to={"../login"} className=" text-blue-500 font-semibold">Inicia sesión</Link></p>
            </div>
        </div>
    )
}

export default SignUp