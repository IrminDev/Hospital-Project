-- VIEWS
GO
CREATE VIEW Datos_Doctor as
SELECT Doctor.idPersona, Doctor.cedula, Doctor.idConsultorio, horaInicio, horaFin,
Persona.apMaterno, Persona.apPaterno, Persona.curp, Persona.nombre 
FROM Doctor join Persona on Doctor.idPersona = Persona.idPersona join Horario on Doctor.idHorario = Horario.idHorario
GO


GO
CREATE VIEW Datos_Paciente AS
	SELECT p.idPersona, nombre, apPaterno, ISNULL(apMaterno, '') AS apMaterno, curp, altura, peso, idTipoSangre, idTipoUsuario, correo, usuario FROM Persona per INNER JOIN Paciente p ON
	per.idPersona = p.idPersona
GO


GO
CREATE VIEW Datos_Recepcionista AS
	SELECT p.idPersona, nombre, apPaterno, ISNULL(apMaterno, '') AS apMaterno, curp, correo, usuario, p.idConsultorio  FROM Persona per INNER JOIN Recepcionista p ON
	per.idPersona = p.idPersona
GO


GO
ALTER VIEW informacion_cita as
SELECT c.idCita, CAST(c.fechaHora as DATE) AS fecha, CAST(c.fechaHora AS TIME) AS hora, tc.tipoCita, ec.estadoCita, c.idDoctor, pd.nombre AS nombreDoctor, pd.apPaterno AS apPaternoDoctor, ISNULL(pd.apMaterno, '') AS apMaternoDoctor, d.idConsultorio, c.idPaciente, pp.nombre AS nombrePaciente, pp.apPaterno AS apPaternoPaciente, ISNULL(pp.apMaterno, '') AS apMaternoPaciente
FROM Cita c INNER JOIN Paciente p ON c.idPaciente = p.idPersona
INNER JOIN Persona pp ON p.idPersona = pp.idPersona
INNER JOIN Doctor d ON c.idDoctor = d.idPersona
INNER JOIN TipoCita tc ON c.idTipoCita = tc.idTipoCita
INNER JOIN EstadoCita ec ON c.idEstadoCita = ec.idEstadoCita
INNER JOIN Persona pd ON d.idPersona = pd.idPersona 
GO
SELECT * FROM informacion_cita
SELECT * FROM Horario


GO
CREATE VIEW compras as
select Compra.idCompra, Persona.usuario, MetodoPago.metodoPago, Pedido.cantidad, Medicamento.medicamento, concat('$', Pedido.cantidad*Medicamento.precio) as costo 
from Compra join Paciente on Compra.idPaciente = Paciente.idPersona join Persona on Paciente.idPersona = Persona.idPersona join MetodoPago on Compra.idMetodoPago = MetodoPago.idMetodoPago 
join Pedido on Compra.idCompra = Pedido.idCompra join Medicamento on Pedido.idMedicamento = Medicamento.idMedicamento
GO


GO
CREATE VIEW Consultas as
select Consulta.idConsulta, Consulta.notaMedica, Consulta.costo, Receta.recomendaciones, Servicio.servicio
from Consulta join Receta on Consulta.idConsulta = Receta.idReceta join ConsultaServicio on Consulta.idConsulta = ConsultaServicio.idConsulta
join Servicio on ConsultaServicio.idServicio = Servicio.idServicio
GO


GO
CREATE VIEW DoctoresTipoCita
AS
SELECT d.idPersona, etc.idTipoCita, de.idEspecialidad FROM Doctor d INNER JOIN DoctorEspecialidad de ON d.idPersona = de.idDoctor
INNER JOIN EspecialidadTipoCita etc ON etc.idEspecialidad = de.idEspecialidad
GO