import React from 'react'
import { useEffect, useState } from 'react'
import medicineService from '../services/medicine';
import personService from '../services/person';
import Header from '../components/Header';
import HeaderLink from '../components/HeaderLink';
import ComboBox from '../components/ComboBox';
import TextArea from '../components/TextArea';
import FormInput from '../components/FormInput';
import ButtonSubmit from '../components/ButtonSubmit';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import prescriptionService from '../services/prescription';

const PrescriptionForm = () => {
	const [medicines, setMedicines] = useState([]);
	const [supplies, setSupplies] = useState([]);
	const [supply, setSupply] = useState({
		medicine: 'default',
		quantity: '',
		description: ''
	});
	const [form, setForm] = useState({
		tip: '',
		supplies: [],
	});
	const [medicineSelected, setMedicineSelected] = useState([]);

	const navigate = useNavigate()
	const { id } = useParams();

	useEffect(() => {
		const session = JSON.parse(localStorage.getItem('user'));
		if(!session){
			navigate('../../login');
		}

		personService.getPersonById(session.id).then((resp) => {
			if(resp[0].idTipoUsuario !== 2){
				navigate('/login');
			}
		})

		medicineService.getMedicines().then((resp) => {
			resp.map((el) => {
				setMedicines((medicine) => [...medicine, {
					id: el.idMedicamento,
					value: el.medicamento
				}])
			})
		});
	}, [])

	const handleSupply = (e) => {
		e.preventDefault();
		if(supply.medicine !== 'default' && supply.quantity !== '' && supply.description !== ''){
			setSupplies((supplies) => [...supplies, {
				medicine: supply.medicine,
				quantity: supply.quantity,
				description: supply.description
			}])
			
			setMedicineSelected(medicineSelected.concat(
				medicines.filter((el) => {
					return el.id === parseInt(supply.medicine)
			})))
	
			setMedicines(medicines.filter((el) => {
				return el.id !== parseInt(supply.medicine)
			}))
			
			setForm({
				...form,
				supplies: form.supplies.concat(supply)
			})

			setSupply({
				medicine: 'default',
				quantity: '',
				description: ''
			})
		}
	}

	const handleSupplyChange = (e) => {
		e.preventDefault();
		setSupply({
			...supply,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		prescriptionService.createPrescription({...form, consultation: id}).then((resp) => {
			if(resp.ok){
				navigate('../doctor/consultations');
			}
		})
	}

	const handleChange = (e) => {
		e.preventDefault();
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
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
				<h1 className=' text-3xl text-center text-blue-500 mb-5'>Generar receta médica</h1>
				<p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Ingrese los medicamentos recetados en el siguiente formulario, agregue medicamento por medicamento.</p>
				<p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Los medicamentos anexados a tu receta aparecerán aquí: 
						{medicineSelected.map((el) => {
							return (
								<span className=' font-bold' key={el.id}>{el.value} </span>
							)
						})}
				</p>
				<p className=' relative m-auto w-full text-center text-slate-800 text-sm font-normal'>Si hubo un error al agregar algún medicamento que no era, recargue la página y llene el formulario de nuevo.</p>
				<form onSubmit={handleSubmit} className=' w-full relative mt-7 mx-auto mb-0'>
					<div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
						<TextArea name={'tip'} handleChange={handleChange} required={true} placeholder={'Recomendaciones'} />
					</div>
					<div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
						<ComboBox value={supply.medicine} options={medicines} handleChange={handleSupplyChange} name={'medicine'} placeholder={'Medicamento'} />
						<FormInput value={supply.quantity} type={'number'} name={'quantity'} handleChange={handleSupplyChange} placeholder={'Cantidad'} />
					</div>
					<div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
						<TextArea value={supply.description} name={'description'} handleChange={handleSupplyChange} placeholder={'Descripcion'} />
						<Button handleClick={handleSupply} text={'Agregar medicamento.'} />
					</div>
					<div className=' w-full grid grid-cols-form gap-y-5 gap-x-8 mb-5'>
						<ButtonSubmit text={'Finalizar consulta'} />
					</div>
				</form>
			</div>
		</div>
	</div>
  	)
}

export default PrescriptionForm