-- FUNCTIONS

--1. Crear una función que al ingresar una hora y especialidad en específico, traer los doctores disponibles para dar consulta y su especialidad.
GO
CREATE FUNCTION Disponibilidad (@fechaingresada time, @especialidad varchar(100))
RETURNS @DocsDisponibles TABLE(
	NombreCompletoDoctor VARCHAR(100),
	CedulaProfesional INT,
	Especialidad VARCHAR(50),
	HoraInicioTurno time,
	HoraFinTurno time,
	Consultorio INT)
AS
BEGIN
INSERT INTO @DocsDisponibles
SELECT DSH.NombreDoctor, DSH.cedula, DSH.especialidad, Hor.horaInicio, Hor.horaFin, DSH.idConsultorio FROM Horario AS Hor INNER JOIN (
	SELECT DCNE.NombreDoctor, DCNE.cedula, E.especialidad, DCNE.idConsultorio, DCNE.idHorario FROM Especialidad AS E INNER JOIN(
		SELECT DCN.*, DE.idEspecialidad FROM DoctorEspecialidad AS DE INNER JOIN (
			SELECT d.idPersona, d.cedula, d.idConsultorio, d.idHorario, CONCAT(P.nombre, ' ', P.apPaterno, ' ', P.apMaterno) AS NombreDoctor 
			FROM Doctor AS D INNER JOIN Persona AS P ON D.idPersona = P.idPersona) AS DCN 
		ON DE.idDoctor = DCN.idPersona) AS DCNE 
	ON DCNE.idEspecialidad = E.idEspecialidad) AS DSH 
ON Hor.idHorario = DSH.idHorario WHERE @fechaingresada BETWEEN Hor.horaInicio AND Hor.horaFin AND @especialidad = DSH.especialidad
RETURN
END
GO


--2. Crear función que traiga las citas confirmadas de cierto doctor
GO
CREATE FUNCTION CitasConfirmadasDoc (@NombreCompDoc VARCHAR(100))
RETURNS @CitasConfiDoc TABLE(
	IdDoctor INT,
	NombreCompletoDoctor VARCHAR(100),
	CedulaProfesional INT,
	IdCita INT,
	NombreCompletoPaciente VARCHAR(100),
	FechaHoraCita datetime,
	TipoCita VARCHAR(100))
AS
BEGIN
INSERT INTO @CitasConfiDoc
SELECT CISTCI.idDoctor, CISTCI.NombreDoctor, CISTCI.cedula, CISTCI.idCita, CISTCI.NombrePaciente, CISTCI.fechaHora, TCi.tipoCita FROM TipoCita AS TCi INNER JOIN(
	SELECT CIPCN.*, ECi.estadoCita FROM EstadoCita AS ECi INNER JOIN(
		SELECT CONCAT(Per.nombre, ' ', Per.apPaterno, ' ', Per.apMaterno) AS NombrePaciente, CIPSN.* FROM Persona AS Per INNER JOIN(
			SELECT Pa.idPersona AS idPaciente, CICD.idDoctor, CICD.NombreDoctor, CICD.cedula, CICD.idCita, CICD.fechaHora, CICD.idTipoCita, CICD.idEstadoCita FROM Paciente AS Pa INNER JOIN(
				SELECT DCN.idDoctor, DCN.NombreDoctor, DCN.cedula, CI.idCita, CI.idPaciente, CI.fechaHora, CI.idTipoCita, CI.idEstadoCita FROM Cita AS CI INNER JOIN(
					SELECT d.idPersona AS idDoctor, CONCAT(P.nombre, ' ', P.apPaterno, ' ', P.apMaterno) AS NombreDoctor, d.cedula FROM Doctor AS D INNER JOIN Persona AS P 
					ON D.idPersona = P.idPersona) AS DCN 
				ON DCN.idDoctor = CI.idDoctor) AS CICD 
			ON CICD.idPaciente = Pa.idPersona) AS CIPSN 
		ON CIPSN.idPaciente = Per.idPersona) AS CIPCN 
	ON CIPCN.idEstadoCita = ECi.idEstadoCita) AS CISTCI 
ON CISTCI.idTipoCita = TCi.idTipoCita WHERE CISTCI.estadoCita = 'Confirmada' AND @NombreCompDoc = CISTCI.NombreDoctor
RETURN
END
GO

--3. Crear función que traiga las citas completadas de cierto doctor
GO
CREATE FUNCTION CitasCompletadasDoc (@NombreCompDoc VARCHAR(100))
RETURNS @CitasConfiDoc TABLE(
	IdDoctor INT,
	NombreCompletoDoctor VARCHAR(100),
	CedulaProfesional INT,
	IdCita INT,
	NombreCompletoPaciente VARCHAR(100),
	FechaHoraCita datetime,
	TipoCita VARCHAR(100),
	NotaMedica VARCHAR(200),
	Costo INT,
	Servicio VARCHAR(30),
	PrecioServicio INT,
	Receta VARCHAR(200),
	Medicamentos VARCHAR(30),
	PrecioMedicamentos INT,
	DescripcionSuministro VARCHAR(100),
	CantidadSuministro INT)
AS
BEGIN
INSERT INTO @CitasConfiDoc
SELECT CONSSUM.idDoctor, CONSSUM.NombreDoctor, CONSSUM.cedula, CONSSUM.idCita, CONSSUM.NombrePaciente, CONSSUM.fechaHora, CONSSUM.tipoCita, CONSSUM.notaMedica, CONSSUM.costo, CONSSUM.servicio, CONSSUM.PrecioServicio, CONSSUM.recomendaciones, Med.medicamento, Med.precio, CONSSUM.descripcion, CONSSUM.cantidad FROM Medicamento AS Med INNER JOIN(
	SELECT CONSREC.*, SU.idMedicamento, SU.descripcion, SU.cantidad FROM Suministro AS SU INNER JOIN(
		SELECT CONSSER.*, RE.recomendaciones FROM Receta AS RE INNER JOIN(
			SELECT CONSINT.*, Ser.servicio, Ser.precio AS PrecioServicio FROM Servicio AS Ser INNER JOIN(
				SELECT CONSSININT.*, CONS.idServicio FROM ConsultaServicio AS CONS INNER JOIN(
					SELECT CICOM.*, CO.notaMedica, CO.costo FROM Consulta AS CO INNER JOIN(
						SELECT CISTCI.idDoctor, CISTCI.NombreDoctor, CISTCI.cedula, CISTCI.idCita, CISTCI.NombrePaciente, CISTCI.fechaHora, TCi.tipoCita, CISTCI.estadoCita FROM TipoCita AS TCi INNER JOIN(
							SELECT CIPCN.*, ECi.estadoCita FROM EstadoCita AS ECi INNER JOIN(
								SELECT CONCAT(Per.nombre, ' ', Per.apPaterno, ' ', Per.apMaterno) AS NombrePaciente, CIPSN.* FROM Persona AS Per INNER JOIN(
									SELECT Pa.idPersona AS idPaciente, CICD.idDoctor, CICD.NombreDoctor, CICD.cedula, CICD.idCita, CICD.fechaHora, CICD.idTipoCita, CICD.idEstadoCita FROM Paciente AS Pa INNER JOIN(
										SELECT DCN.idDoctor, DCN.NombreDoctor, DCN.cedula, CI.idCita, CI.idPaciente, CI.fechaHora, CI.idTipoCita, CI.idEstadoCita FROM Cita AS CI INNER JOIN(
											SELECT d.idPersona AS idDoctor, CONCAT(P.nombre, ' ', P.apPaterno, ' ', P.apMaterno) AS NombreDoctor, d.cedula FROM Doctor AS D INNER JOIN Persona AS P 
											ON D.idPersona = P.idPersona) AS DCN 
										ON DCN.idDoctor = CI.idDoctor) AS CICD 
									ON CICD.idPaciente = Pa.idPersona) AS CIPSN 
								ON CIPSN.idPaciente = Per.idPersona) AS CIPCN 
							ON CIPCN.idEstadoCita = ECi.idEstadoCita) AS CISTCI 
						ON CISTCI.idTipoCita = TCi.idTipoCita) AS CICOM 
					ON CICOM.idCita = CO.idConsulta) AS CONSSININT 
				ON CONSSININT.idCita = CONS.idConsulta) AS CONSINT 
			ON CONSINT.idServicio = Ser.idServicio) AS CONSSER 
		ON CONSSER.idCita = RE.idReceta) AS CONSREC 
	ON CONSREC.idCita = SU.idReceta) AS CONSSUM 
ON CONSSUM.idMedicamento = Med.idMedicamento WHERE CONSSUM.estadoCita = 'Completada' AND @NombreCompDoc = CONSSUM.NombreDoctor
RETURN
END
GO


--4. Crear función que obtenga todas las consultas de cierto paciente
GO
CREATE FUNCTION ConsultasPaciente (@NombreCompPaciente VARCHAR(100))
RETURNS @CitasConfiDoc TABLE(
	NombreCompletoPaciente VARCHAR(100),
	PesoPaciente INT,
	AlturaPaciente INT,
	TipoSangrePaciente VARCHAR(20),
	IdDoctor INT,
	NombreCompletoDoctor VARCHAR(100),
	CedulaProfesional INT,
	IdCita INT,
	FechaHoraCita datetime,
	TipoCita VARCHAR(100),
	NotaMedica VARCHAR(200),
	Costo INT,
	Servicio VARCHAR(30),
	PrecioServicio INT,
	Receta VARCHAR(200),
	Medicamentos VARCHAR(30),
	PrecioMedicamentos INT,
	DescripcionSuministro VARCHAR(100),
	CantidadSuministro INT)
AS
BEGIN
INSERT INTO @CitasConfiDoc
SELECT PACSINTS.NombrePaciente, PACSINTS.peso, PACSINTS.altura, TS.tipoSangre, PACSINTS.idDoctor, PACSINTS.NombreDoctor, PACSINTS.cedula, PACSINTS.idCita,  PACSINTS.fechaHora, PACSINTS.tipoCita, PACSINTS.notaMedica, PACSINTS.costo, PACSINTS.servicio, PACSINTS.PrecioServicio, PACSINTS.recomendaciones, PACSINTS.medicamento, PACSINTS.precio, PACSINTS.descripcion, PACSINTS.cantidad FROM TipoSangre AS TS INNER JOIN(
SELECT CONSSUM.idDoctor, CONSSUM.NombreDoctor, CONSSUM.cedula, CONSSUM.idCita, CONSSUM.NombrePaciente, CONSSUM.fechaHora, CONSSUM.tipoCita, CONSSUM.notaMedica, CONSSUM.costo, CONSSUM.servicio, CONSSUM.PrecioServicio, CONSSUM.recomendaciones, Med.medicamento, Med.precio, CONSSUM.descripcion, CONSSUM.cantidad, CONSSUM.peso, CONSSUM.altura, CONSSUM.idTipoSangre, CONSSUM.estadoCita FROM Medicamento AS Med INNER JOIN(
	SELECT CONSREC.*, SU.idMedicamento, SU.descripcion, SU.cantidad FROM Suministro AS SU INNER JOIN(
		SELECT CONSSER.*, RE.recomendaciones FROM Receta AS RE INNER JOIN(
			SELECT CONSINT.*, Ser.servicio, Ser.precio AS PrecioServicio FROM Servicio AS Ser INNER JOIN(
				SELECT CONSSININT.*, CONS.idServicio FROM ConsultaServicio AS CONS INNER JOIN(
					SELECT CICOM.*, CO.notaMedica, CO.costo FROM Consulta AS CO INNER JOIN(
						SELECT CISTCI.idDoctor, CISTCI.NombreDoctor, CISTCI.cedula, CISTCI.idCita, CISTCI.NombrePaciente, CISTCI.fechaHora, TCi.tipoCita, CISTCI.estadoCita, CISTCI.peso, CISTCI.altura, CISTCI.idTipoSangre FROM TipoCita AS TCi INNER JOIN(
							SELECT CIPCN.*, ECi.estadoCita FROM EstadoCita AS ECi INNER JOIN(
								SELECT CONCAT(Per.nombre, ' ', Per.apPaterno, ' ', Per.apMaterno) AS NombrePaciente, CIPSN.* FROM Persona AS Per INNER JOIN(
									SELECT Pa.idPersona AS idPaciente, CICD.idDoctor, CICD.NombreDoctor, CICD.cedula, CICD.idCita, CICD.fechaHora, CICD.idTipoCita, CICD.idEstadoCita, Pa.peso, Pa.altura, Pa.idTipoSangre FROM Paciente AS Pa INNER JOIN(
										SELECT DCN.idDoctor, DCN.NombreDoctor, DCN.cedula, CI.idCita, CI.idPaciente, CI.fechaHora, CI.idTipoCita, CI.idEstadoCita FROM Cita AS CI INNER JOIN(
											SELECT d.idPersona AS idDoctor, CONCAT(P.nombre, ' ', P.apPaterno, ' ', P.apMaterno) AS NombreDoctor, d.cedula FROM Doctor AS D INNER JOIN Persona AS P 
											ON D.idPersona = P.idPersona) AS DCN 
										ON DCN.idDoctor = CI.idDoctor) AS CICD 
									ON CICD.idPaciente = Pa.idPersona) AS CIPSN 
								ON CIPSN.idPaciente = Per.idPersona) AS CIPCN 
							ON CIPCN.idEstadoCita = ECi.idEstadoCita) AS CISTCI 
						ON CISTCI.idTipoCita = TCi.idTipoCita) AS CICOM 
					ON CICOM.idCita = CO.idConsulta) AS CONSSININT 
				ON CONSSININT.idCita = CONS.idConsulta) AS CONSINT 
			ON CONSINT.idServicio = Ser.idServicio) AS CONSSER 
		ON CONSSER.idCita = RE.idReceta) AS CONSREC 
	ON CONSREC.idCita = SU.idReceta) AS CONSSUM 
ON CONSSUM.idMedicamento = Med.idMedicamento) AS PACSINTS 
ON PACSINTS.idTipoSangre = TS.idTipoSangre WHERE PACSINTS.estadoCita = 'Completada' AND @NombreCompPaciente = PACSINTS.NombrePaciente
RETURN
END
GO