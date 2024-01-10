import React from 'react'
import { useEffect, useState } from 'react'
import personService from '../services/person';
import Header from '../components/Header';
import HeaderLink from '../components/HeaderLink';
import ComboBox from '../components/ComboBox';
import FormInput from '../components/FormInput';
import ButtonSubmit from '../components/ButtonSubmit';
import { useNavigate } from 'react-router-dom';
import specialityService from '../services/speciality';
import scheduleService from '../services/schedule';
import doctorService from '../services/doctor';
import consultingService from '../services/consultings';
import Button from '../components/Button';
import moment from 'moment';

const DoctorForm = () => {
    const [specialities, setSpecialities] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [form, setForm] = useState({
        name: '',
        fatherLastName: '',
        motherLastName: '',
        curp: '',
        mail: '',
        user: '',
        password: '',
        professionalId: '',
        schedule: 'default',
        consulting: 'default',
        specialities: [],
    });
    const [specialitiesSelected, setSpecialitiesSelected] = useState([]);
    const [speciality, setSpeciality] = useState({
        id: 'default',
        value: ''
    });
    const [consultings, setConsultings] = useState([]);

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

        specialityService.getSpecialities().then((resp) => {
            resp.map((el) => {
                setSpecialities((specialities) => [...specialities, {
                    id: el.idEspecialidad,
                    value: el.especialidad
                }])
            })
        })

        scheduleService.getSchedules().then((resp) => {
            resp.map((el) => {
                setSchedules((schedules) => [...schedules, {
                    id: el.idHorario,
                    value: moment(el.horaInicio).utc().format('HH:mm') + ' - ' + moment(el.horaFin).utc().format('HH:mm')
                }])
            })
        })

        consultingService.getConsultings().then((resp) => {
            resp.map((el) => {
                setConsultings((consultings) => [...consultings, {
                    id: el.idConsultorio,
                    value: el.idConsultorio
                }])
            })
        })
    },[])

    const handleSpecialities = (e) => {
        e.preventDefault();
        setSpeciality({
            id: e.target.value,
            value: e.target.options[e.target.selectedIndex].text
        })
    }

    const handleAddSpeciality = (e) => {
        e.preventDefault()

        setSpecialitiesSelected((specialitiesSelected) => [...specialitiesSelected, {
            id: speciality.id,
            value: speciality.value
        }])

        setSpecialities((specialities) => specialities.filter((el) => el.id !== parseInt(speciality.id)))

        setForm({
            ...form,
            specialities: [...form.specialities, { id: speciality.id}]
        })

        setSpeciality({
            id: 'default',
            value: ''
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        doctorService.createDoctor(form).then((resp) => {
            console.log(resp)
            if (resp.status === 200) {
                navigate('../home');
            } else {
                alert('Error al crear doctor.');
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
				<h1 className=' text-3xl text-center text-blue-500 mb-5'>Registro de doctor</h1>
				<p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Registra a un médico en el sistema. Recuerda tener cuidado al proporcionarle sus credenciales</p>
				<p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Las especialidades del médico aparecerán aquí:
						{specialitiesSelected.map((el) => {
							return (
								<span className=' font-bold' key={el.id}>{el.value} </span>
							)
						})}
				</p>
				<p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Si hubo un error al agregar alguna especialidad que no era, recargue la página y llene el formulario de nuevo.</p>
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
                        <FormInput value={form.password} type={'password'} name={'password'} handleChange={handleChange} required={true} placeholder={'Contraseña'} />
                        <FormInput value={form.professionalId} name={'professionalId'} handleChange={handleChange} required={true} placeholder={'Cédula profesional'} maxlength={6} />
					</div>
                    <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                        <ComboBox value={speciality.id} name={'specialities'} handleChange={handleSpecialities} placeholder={'Especialidad'} options={specialities} required={true} />
                        <Button handleClick={handleAddSpeciality} text={'Agregar especialidad'} />
                    </div>             
					<div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
                        <ComboBox value={form.consulting} name={'consulting'} handleChange={handleChange} placeholder={'Consultorio'} options={consultings} required={true} />
                        <ComboBox value={form.schedule} name={'schedule'} handleChange={handleChange} placeholder={'Horario'} options={schedules} required={true} />
					</div>
                    <div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
						<ButtonSubmit text={'Registrar doctor'} />
					</div>
				</form>
			</div>
		</div>
	</div>
    )
}

export default DoctorForm