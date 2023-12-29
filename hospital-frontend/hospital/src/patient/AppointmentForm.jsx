import React, { useState } from 'react'
import FormInput from '../components/FormInput'
import appointmentService from '../services/appointment';
import ComboBox from '../components/ComboBox';
import doctorService from '../services/doctor'
import appointmentService from '../services/appointment';
import moment from 'moment';

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
    const [enabled, setEnabled] = useState({
        doctor: false,
        date: false,
        time: false
    });

    useEffect(() => {
        appointmentService.getAppointmentTypes().then((resp) => {
            resp.map((element) => {
                setTypes((type) => [...type, {
                    id: element.idTipoCita,
                    value: element.tipoCita
                }])
            })
        })
    }, []);

    const handleType = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setEnabled({
            doctor: true,
            date: false,
            time: false
        })

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
        setEnabled({
            doctor: true,
            date: true,
            time: false
        })
    }

    const handleDate = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setEnabled({
            doctor: true,
            date: true,
            time: true
        })

        doctorService.getDoctor(form.doctor).then((resp) => {
            for (let i = 0; i < 8; i++) {
                setSchedules((schedule) => [...schedule, {
                    id: moment(resp[0].horaInicio, "hh:mm:ss").add(i, "h"),
                    value: moment(resp[0].horaInicio, "hh:mm:ss").add(i, "h")
                }])
            }
        })

        appointmentService.getAppointmentsBySchedule(form.doctor, form.date).then((resp) => {
            const updatedSchedule = schedules.filter(scheduleItem => {
                return !resp.some(respItem => respItem.schedule === scheduleItem.schedule);
            });

            setSchedules(updatedSchedule);
        })
    }

    const handleTime = (e) => {

    }

    return (
        <div className=' h-[120vh] max-sm:h-[145vh]'>
            <div className=' bg-blue-100 w-[90%] px-8 py-12 translate-x-[-50%] translate-y-[-50%] absolute left-1/2 top-1/2 mt-24 mb-24 max-md:mt-52 rounded-2xl border-2 border-blue-400'>
                <h1 className=' text-3xl text-center text-blue-500 mb-5'>Agenda una cita</h1>
                <p className=' relative m-auto w-full text-center bg-slate-800 text-sm font-normal'>Agenda una cita de acuerdo con tus necesidades. Recuerda tomar en cuenta que si en un futuro deseas cancelarla esta será penalizada con 90 pesos.</p>
                <form action="" className=' w-full relative mt-7 mx-auto mb-0'>
                    <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                        <ComboBox options={types} name={'type'} required={true} placeholder={'Tipo de cita'} />
                        <ComboBox options={doctors} name={'doctor'} required={true} placeholder={'Doctor'} />
                    </div>
                    <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                        <FormInput name={'date'} required={true} placeholder={'Fecha de cita'} />
                        <ComboBox options={schedules} name={'schedule'} required={true} placeholder={'Horario'} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AppointmentForm