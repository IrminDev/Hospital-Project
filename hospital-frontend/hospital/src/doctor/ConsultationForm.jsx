import React from 'react'
import { useEffect, useState } from 'react'
import appointmentService from '../services/appointment';
import servicesService from '../services/service';
import consultationService from '../services/consultation';
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HeaderLink from '../components/HeaderLink'
import ComboBox from '../components/ComboBox'
import TextArea from '../components/TextArea'
import FormInput from '../components/FormInput'
import ButtonSubmit from '../components/ButtonSubmit'
import personService from '../services/person';

const ConsultationForm = () => {
	const [appointments, setAppointments] = useState([]);
	const [services, setServices] = useState([]);
	const [servicesSelected, setServicesSelected] = useState([]);
	const [form, setForm] = useState({
		appointment: 0,
		services: [],
		cost: 0,
		note: ''
	});

	const navigate = useNavigate();

	useEffect(() => {
		const session = JSON.parse(localStorage.getItem('user'));
		if(!session){
			navigate('/login');
		}
		
		personService.getPersonById(session.id).then((resp) => {
			if(resp[0].idTipoUsuario !== 2){
				navigate('/login');
			}
		})

		appointmentService.getCompletedAppointments(session.id).then((resp) => {
			resp.map((el) => {
				if(el.estadoCita){
					setAppointments((appointments) => [...appointments, {
						id: el.idCita,
						value: el.idCita
					}])
				}
			})
		})

		servicesService.getServices().then((resp) => {
			resp.map((el) => {
				setServices((services) => [...services, {
					id: el.idServicio,
					value: el.servicio
				}])
			})
		})
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		consultationService.createConsultation(form).then((resp) => {
			if(resp.ok){
				navigate('../doctor/consultations');
			}
		})
	}

	const handleServices = (e) => {
		e.preventDefault();
		setForm({
			...form,
			services: form.services.concat(e.target.value) 
		})

		setServices(
			services.filter((el) => {
				return el.id !== parseInt(e.target.value)
		}))

		setServicesSelected(servicesSelected.concat(
			services.filter((el) => {
				return el.id === parseInt(e.target.value)
			})))
			
		e.target.value = 'default';
	}

	return (
		<div>
			<Header>
					<HeaderLink text={'Citas'} url={'../home'} />
					<HeaderLink text={'Consultas'} url={'../doctor/consultations'} />
					<HeaderLink text={'Pacientes'} url={'../doctor/medical-history'} />
					<HeaderLink text={'Perfil'} url={'../doctor/profile'} />
			</Header>

			<div className=' h-[100vh] max-sm:h-[145vh] bg-slate-100'>
				<div className=' bg-blue-50 w-[90%] px-8 py-12 translate-x-[-50%] translate-y-[-50%] absolute left-1/2 top-1/2 mt-24 mb-24 max-md:mt-52 rounded-2xl border-2 border-blue-400'>
						<h1 className=' text-3xl text-center text-blue-500 mb-5'>Finalizar consulta</h1>
						<p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Ingrese información a la consulta para marcarla en el historial médico del paciente.</p>
						<p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Los servicios anexados a tu consulta aparecerán aquí: 
								{servicesSelected.map((el) => {
									return (
										<span className=' font-bold' key={el.id}>{el.value} </span>
									)
								})}
						</p>
						<p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Si hubo un error al agregar algún servicio que no era, recargue la página y llene el formulario de nuevo.</p>
						<form onSubmit={handleSubmit} className=' w-full relative mt-7 mx-auto mb-0'>
								<div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
										<ComboBox options={appointments} handleChange={handleChange} name={'appointment'} required={true} placeholder={'Cita'} />
										<ComboBox options={services} handleChange={handleServices} name={'service'} required={true} placeholder={'Servicios'} />
								</div>
								<div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
										<TextArea name={'note'} handleChange={handleChange} required={true} placeholder={'Nota médica'} />
								</div>
								<div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
										<FormInput type={'number'} handleChange={handleChange} min={0} name={'cost'} required={true} placeholder={'Costo'} />
										<ButtonSubmit text={'Finalizar consulta'} />
								</div>
						</form>
					</div>
				</div>

		</div>
	)
}

export default ConsultationForm