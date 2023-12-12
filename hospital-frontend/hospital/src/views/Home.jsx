import React from 'react'
import { useEffect } from 'react'
import personService from '../services/person'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import FormInput from '../components/FormInput'

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
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
    const [form, setForm] = useState({
        name: '',
    });

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'));
        if (!session) {
            navigate('/login')
        }
        const res = personService.getPersonById(session.id).then((resp) => {
            setUser({
                name: resp[0].nombre,
                fatherLastName: resp[0].apPaterno,
                motherLastName: resp[0].apMaterno,
                curp: resp[0].curp,
                mail: resp[0].correo,
                height: resp[0].estatura,
                weight: resp[0].peso,
                bloodType: resp[0].tipoSangre,
                user: resp[0].usuario,
                password: resp[0].contrasena,
            })
        })
    }, []);

    const handleChange = (event) => {
        event.preventDefault()
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const session = JSON.parse(localStorage.getItem('user'));
        const res = personService.changeName(session.id, form.name).then((resp) => {
            setUser({
                ...user,
                name: form.name
            })
        })
    }

    const handleDelete = async () => {
        const session = JSON.parse(localStorage.getItem('user'));
        await personService.deletePerson(session.id)
        localStorage.removeItem('user')
        navigate('/login')
    }

    const handleLogout =  () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <div>
            <h1>Home</h1>
            <p>Hola {user.name} {user.fatherLastName} {user.motherLastName}</p>
            <form onSubmit={handleSubmit}>
                <FormInput type={'text'} required={true} placeholder={'nombre'} name={'name'} handleChange={handleChange} />
                <button className=' bg-green-500 text-white p-3' type='submit'>Cambiar</button> 
            </form>
            <button className=' bg-orange-500 text-white p-3' onClick={handleLogout}>Cerrar sesion</button> 
            <button className=' bg-red-500 text-white p-3' onClick={handleDelete} >Eliminar</button> 
        </div>
    )
}

export default Home