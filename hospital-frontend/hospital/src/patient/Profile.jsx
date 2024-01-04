import React from 'react'
import { useEffect, useState } from 'react'
import personService from '../services/person'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        fatherLastName: '',
        motherLastName: '',
        curp: '',
        mail: '',
        type: 0,
        user: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'));
        if(!session){
            navigate('../../login');
        }

        personService.getPersonById(session.id).then((resp) => {
            setUser({
                name: resp[0].nombre,
                fatherLastName: resp[0].apPaterno,
                motherLastName: resp[0].apMaterno,
                curp: resp[0].curp,
                mail: resp[0].correo,
                user: resp[0].usuario,
                type: resp[0].idTipoUsuario
            })

            if(resp[0].idTipoUsuario !== 1){
                navigate('/login');
            }
        })
    }, []);

    const handleLogout =  () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <div>
            <Header>
                <HeaderLink text={'Citas'} url={'/../home'} />
                <HeaderLink text={'Consultas'} url={'/consultations'} />
                <HeaderLink text={'Compras'} url={'../patient/purchases'} />
                <HeaderLink text={'Perfil'} url={'../patient/profile'} />
            </Header>

            <div className=' w-full mt-32 flex flex-col items-center justify-start'>
                <div className=' rounded-lg bg-blue-300 w-[80%] flex flex-row items-center justify-evenly p-5'>
                    <div className=' w-[80%] flex flex-col justify-evenly'>
                        <p className=' text-4xl font-bold text-slate-800'>{'Paciente: ' + user.name + ' ' + user.fatherLastName + ' ' + user.motherLastName}</p>
                        <p className=' text-lg font-bold text-slate-800'>{'Usuario: ' + user.user}</p>
                        <p className=' text-base font-semibold text-slate-800 mt-5'>{'CURP: ' + user.curp}</p>
                        <p className=' text-base font-semibold text-slate-800 mt-5 mb-8'>{'Correo: ' + user.mail}</p>
                        <Button text={'Cerrar sesión'} handleClick={handleLogout} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile