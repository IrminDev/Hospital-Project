-- VIEWS
GO
ALTER VIEW Datos_Doctor as
SELECT d.idPersona, d.cedula, d.idConsultorio, horaInicio, horaFin,
p.apMaterno, p.apPaterno, p.curp, p.nombre, ISNULL(e.especialidad, '') AS especialidad, p.habilitado
FROM Doctor d JOIN Persona p ON d.idPersona = p.idPersona
JOIN Horario h ON d.idHorario = h.idHorario
LEFT JOIN DoctorEspecialidad de ON de.idDoctor = d.idPersona
LEFT JOIN Especialidad e ON e.idEspecialidad = de.idEspecialidad
WHERE p.habilitado = 1
GO



GO
ALTER VIEW Datos_Paciente AS
	SELECT p.idPersona, nombre, apPaterno, ISNULL(apMaterno, '') AS apMaterno, curp, altura, peso, idTipoSangre, idTipoUsuario, correo, usuario, habilitado FROM Persona per INNER JOIN Paciente p ON per.idPersona = p.idPersona
	WHERE per.habilitado = 1
GO



GO
ALTER VIEW Datos_Recepcionista AS
	SELECT p.idPersona, nombre, apPaterno, ISNULL(apMaterno, '') AS apMaterno, curp, correo, usuario, p.idConsultorio  FROM Persona per INNER JOIN Recepcionista p ON per.idPersona = p.idPersona
	WHERE per.habilitado = 1
GO


GO
ALTER VIEW informacion_cita as
SELECT c.idCita, CAST(c.fechaHora as DATE) AS fecha, CAST(c.fechaHora AS TIME) AS hora, tc.idTipoCita, tc.tipoCita, ec.estadoCita, c.idDoctor, pd.nombre AS nombreDoctor, pd.apPaterno AS apPaternoDoctor, ISNULL(pd.apMaterno, '') AS apMaternoDoctor, d.idConsultorio, c.idPaciente, pp.nombre AS nombrePaciente, pp.apPaterno AS apPaternoPaciente, ISNULL(pp.apMaterno, '') AS apMaternoPaciente, cr.piso, cr.telefono, c.costo
FROM Cita c INNER JOIN Paciente p ON c.idPaciente = p.idPersona
INNER JOIN Persona pp ON p.idPersona = pp.idPersona
INNER JOIN Doctor d ON c.idDoctor = d.idPersona
INNER JOIN TipoCita tc ON c.idTipoCita = tc.idTipoCita
INNER JOIN EstadoCita ec ON c.idEstadoCita = ec.idEstadoCita
INNER JOIN Persona pd ON d.idPersona = pd.idPersona 
INNER JOIN Consultorio cr ON d.idConsultorio = cr.idConsultorio
GO


GO
CREATE VIEW Informacion_Receta AS
SELECT r.idReceta,  r.recomendaciones, m.medicamento, s.cantidad, s.descripcion FROM Receta r INNER JOIN Suministro s ON r.idReceta = s.idReceta
INNER JOIN Medicamento m ON s.idMedicamento = m.idMedicamento
GO
SELECT * FROM Informacion_Receta


GO
ALTER VIEW compras as
SELECT Compra.idCompra, Persona.idPersona, Persona.usuario, CONCAT(Persona.nombre, ' ', Persona.apPaterno, ' ', ISNULL(Persona.apMaterno, '')) AS nombre,
MetodoPago.metodoPago, Pedido.cantidad, Medicamento.medicamento, Pedido.cantidad*Medicamento.precio AS costo,
CAST(Compra.fechaHora AS date) AS fecha, CAST(Compra.fechaHora AS time) AS hora
FROM Compra JOIN Paciente ON Compra.idPaciente = Paciente.idPersona 
JOIN Persona ON Paciente.idPersona = Persona.idPersona
JOIN MetodoPago ON Compra.idMetodoPago = MetodoPago.idMetodoPago 
JOIN Pedido ON Compra.idCompra = Pedido.idCompra
JOIN Medicamento ON Pedido.idMedicamento = Medicamento.idMedicamento
GO

SELECT * FROM compras
SELECT * FROM Compra


GO
ALTER VIEW Consultas as
	SELECT con.idConsulta, ci.idPaciente, ci.idDoctor, CONCAT(pp.nombre, ' ', pp.apPaterno, ' ', ISNULL(pp.apMaterno, '')) AS nombrePaciente, CONCAT(pd.nombre, ' ', pd.apPaterno, ' ', ISNULL(pd.apMaterno, '')) AS nombreDoctor, ci.fechaHora, con.notaMedica, con.costo, s1.costos + con.costo AS costoTotal ,ISNULL(servicios, 0) AS servicios FROM Consulta con INNER JOIN Cita ci ON con.idConsulta = ci.idCita
	INNER JOIN Persona pp ON pp.idPersona = ci.idPaciente
	INNER JOIN Persona pd ON pd.idPersona = ci.idDoctor
	LEFT JOIN (
		SELECT idConsulta, COUNT(idServicio) AS servicios FROM ConsultaServicio
		GROUP BY idConsulta
	) s ON con.idConsulta = s.idConsulta
	LEFT JOIN (
		SELECT idConsulta, SUM(serv.precio) AS costos FROM ConsultaServicio cs
		INNER JOIN Servicio serv ON serv.idServicio = cs.idServicio
		GROUP BY idConsulta
	) s1 ON con.idConsulta = s1.idConsulta
GO


GO
CREATE VIEW Informacion_Consultas AS
	SELECT c.idConsulta, c.notaMedica, c.costo, s.servicio, s.precio, CAST(ap.fechaHora AS date) AS fecha,
	CAST(ap.fechaHora AS time) AS hora, tc.tipoCita, CONCAT(pp.nombre, ' ', pp.apPaterno, ' ', ISNULL(pp.apMaterno, '')) AS nombrePaciente,
	CONCAT(pd.nombre, ' ', pd.apPaterno, ' ', ISNULL(pd.apMaterno, '')) AS nombreDoctor, ap.idPaciente, ap.idDoctor
	FROM Consulta c INNER JOIN Cita ap ON c.idConsulta = ap.idCita
	LEFT JOIN ConsultaServicio cs ON cs.idConsulta = c.idConsulta
	LEFT JOIN Servicio s ON s.idServicio = cs.idServicio
	INNER JOIN Persona pp ON pp.idPersona = ap.idPaciente
	INNER JOIN Persona pd ON pd.idPersona = ap.idDoctor
	INNER JOIN TipoCita tc ON tc.idTipoCita = ap.idTipoCita
GO


GO
ALTER VIEW DoctoresTipoCita
AS
	SELECT d.idPersona, etc.idTipoCita, de.idEspecialidad FROM Doctor d INNER JOIN DoctorEspecialidad de ON d.idPersona = de.idDoctor
	INNER JOIN EspecialidadTipoCita etc ON etc.idEspecialidad = de.idEspecialidad
	INNER JOIN Persona p ON p.idPersona = d.idPersona
	WHERE p.habilitado = 1
GO
