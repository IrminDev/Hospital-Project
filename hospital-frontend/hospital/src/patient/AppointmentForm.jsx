import React, { useState, useEffect } from 'react'
import FormInput from '../components/FormInput'
import appointmentService from '../services/appointment';
import personService from '../services/person';
import ComboBox from '../components/ComboBox';
import doctorService from '../services/doctor'
import moment from 'moment';
import Header from '../components/Header';
import HeaderLink from '../components/HeaderLink';
import ButtonSubmit from '../components/ButtonSubmit';
import { useNavigate } from 'react-router-dom'

const AppointmentForm = () => {
    const [types, setTypes] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [form, setForm] = useState({
        type: 0,
        doctor: 0,
        date: '',
        time: '',
    });
    const [disabled, setDisabled] = useState({
        doctor: true,
        date: true,
        time: true
    });
    const [checked, setChecked] = useState(false);

    const navigate = useNavigate();
    
    
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'));
        if(!session){
            navigate('/login');
        }

        personService.getPersonById(session.id).then((resp) => {
            if(resp[0].idTipoUsuario !== 1){
                navigate('/login');
            }
        })

        appointmentService.getAppointmentTypes().then((resp) => {
            resp.map((element) => {
                setTypes((type) => [...type, {
                    id: element.idTipoCita,
                    value: element.tipoCita
                }])
            })
        })

        
    }, []);

    useEffect(() => {
        if(form.date && !checked && form.doctor && schedules.length === 8){
            appointmentService.getAppointmentsBySchedule(JSON.parse(localStorage.getItem('user')).id, form.doctor, form.date).then((resp) => {
                const updatedSchedule = schedules.slice();
                for (let i = 0; i < resp.length; i++) {
                    const indexToRemove = updatedSchedule.findIndex(item => item.id === moment(resp[i].hora).utc().format("HH:mm:ss"));
                    if (indexToRemove !== -1) {
                        updatedSchedule.splice(indexToRemove, 1);
                    }
                }

                setChecked(true)
                setSchedules(updatedSchedule);
            });
        }
    }, [schedules]);

    const handleType = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setDisabled({
            doctor: false,
            date: true,
            time: true
        })

        setDoctors([])
        doctorService.getDoctorsByAppointmentType(e.target.value).then((resp) => {
            resp.map((el) => {
                setDoctors((doctor) => [...doctor, {
                    id: el.idPersona,
                    value: el.nombre + ' ' + el.apPaterno + ' ' + el.apMaterno
                }])
            })
        })
    }

    const handleDoctor = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setDisabled({
            doctor: false,
            date: false,
            time: true
        })
    }

    const handleDate = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setDisabled({
            doctor: false,
            date: false,
            time: false
        })

        setSchedules([])
        doctorService.getDoctor(form.doctor).then((resp) => {
            const newSchedules = [];

            for (let i = 0; i < 8; i++) {
                newSchedules.push({
                    id: moment(resp[0].horaInicio).utc().add(i, "h").format("HH:mm:ss"),
                    value: moment(resp[0].horaInicio).utc().add(i, "h").format("HH:mm:ss")
                })
            }

            setSchedules(data => [...data, ...newSchedules]);
            setChecked(false)
        })
    }

    const handleTime = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newAppointment = {
            idPaciente: JSON.parse(localStorage.getItem('user')).id,
            idTipoCita: form.type,
            idDoctor: form.doctor,
            fecha: form.date,
            hora: form.schedule
        }

        appointmentService.createAppointment(newAppointment).then((resp) => {
            if(resp.ok){
                navigate('../patient/appointment/' + resp.idTipoCita)
            }
        })
    }

    return (
        <div>
            <Header>
                <HeaderLink text={'Citas'} url={'../home'} />
                <HeaderLink text={'Consultas'} url={'../patient/consultations'} />
                <HeaderLink text={'Compras'} url={'../patient/purchases'} />
                <HeaderLink text={'Perfil'} url={'../patient/profile'} />
            </Header>
            <div className=' h-[100vh] max-sm:h-[145vh] bg-slate-100'>
                <div className=' bg-blue-50 w-[90%] px-8 py-12 translate-x-[-50%] translate-y-[-50%] absolute left-1/2 top-1/2 mt-24 mb-24 max-md:mt-52 rounded-2xl border-2 border-blue-400'>
                    <h1 className=' text-3xl text-center text-blue-500 mb-5'>Agenda una cita</h1>
                    <p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Agenda una cita de acuerdo con tus necesidades. Recuerda tomar en cuenta que si en un futuro deseas cancelarla esta será penalizada con 90 pesos.</p>
                    <form onSubmit={handleSubmit} className=' w-full relative mt-7 mx-auto mb-0'>
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                            <ComboBox options={types} handleChange={handleType} name={'type'} required={true} placeholder={'Tipo de cita'} />
                            <ComboBox options={doctors} handleChange={handleDoctor} disabled={disabled.doctor} name={'doctor'} required={true} placeholder={'Doctor'} />
                        </div>
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                            <FormInput type={'date'} handleChange={handleDate} min={moment(new Date()).add(1, 'month').format('YYYY-MM-DD')} name={'date'} disabled={disabled.date} required={true} placeholder={'Fecha de cita'} />
                            <ComboBox handleChange={handleTime} options={schedules} disabled={disabled.time} name={'schedule'} required={true} placeholder={'Horario'} />
                        </div>
                        <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                           <ButtonSubmit text={'Agendar cita'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AppointmentForm