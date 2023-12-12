import React from 'react'
import FormInput from '../components/FormInput'
import { useState, useEffect } from 'react'
import ButtonSubmit from '../components/ButtonSubmit'
import { Link } from 'react-router-dom'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    return (
        <div className="flex justify-between items-center w-[100%] h-[100vh]">
            <div className=" bg-login bg-cover bg-no-repeat bg-center w-[50%] h-[100%]">
            </div>
            <div className=" flex items-center justify-center w-[50%] flex-col">
                <LoginForm />
            </div>
        </div>
    )
}

const LoginForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        user: '',
        password: '',
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/home')
        }
    }, []);

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
            const resp = await loginService.login(form)
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
                <h1 className=" text-4xl mb-10 text-blue-500">Inicio de sesión</h1>
                <p className=" text-md w-[90%] mb-5 text-center">Inicia sesión con tus credenciales para acceder al sistema del hospital.</p>
                <form onSubmit={handleSubmit} className=" w-[100%] flex items-center justify-center flex-col px-[4rem]">
                    <FormInput name={'user'} type={'text'} required={true} placeholder={'Usuario'} handleChange={handleChange} />
                    <FormInput name={'password'} type={'password'} required={true} placeholder={'Contraseña'} handleChange={handleChange} />
                    <div className=' w-[60%]'>
                        <ButtonSubmit text={'Iniciar sesión'} />
                    </div>
                </form>
                <p className=" w-[90%] text-md text-center mt-5">¿Aún no tienes una cuenta? <Link to={"../sign-up"} className=" text-blue-500 font-semibold">Regístrate</Link></p>
            </div>
        </div>
    )
}

export default Login