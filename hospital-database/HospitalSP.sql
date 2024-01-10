-- STORED PROCEDURES
GO
CREATE PROCEDURE iniciarSesion(
	@username nvarchar(30)
)
AS BEGIN
	SELECT * FROM Persona WHERE usuario = @username AND habilitado = 1
END
GO


GO
CREATE PROCEDURE registrarPaciente(
	@name nvarchar(30),
	@fatherLastName nvarchar(30),
	@motherLastName nvarchar(30),
	@curp nvarchar(30),
	@user nvarchar(30),
	@password nvarchar(120),
	@mail nvarchar(30),
	@weight int,
	@height int,
	@bloodType int
) AS BEGIN
	INSERT INTO Persona (nombre, apPaterno, apMaterno, usuario, curp, contrasena, idTipoUsuario, correo)
	VALUES
	(@name, @fatherLastName, @motherLastName, @user, @curp, @password, 1, @mail);

	DECLARE @idUser AS INT;
	SET @idUser = SCOPE_IDENTITY();

	INSERT INTO Paciente (idPersona, peso, altura, idTipoSangre)
	VALUES
	(@idUser, @weight, @height, @bloodType);

	SELECT * FROM Persona WHERE idPersona = @idUser
END
GO


GO
CREATE PROCEDURE getPerson(
	@id int
)
AS BEGIN
	SELECT * FROM Persona WHERE idPersona = @id
END
GO


GO
CREATE PROCEDURE getPatient(
	@id int
)
AS BEGIN
	SELECT * FROM Datos_Paciente
	WHERE idPersona = @id;
END
GO


GO
CREATE PROCEDURE deletePerson(
	@id int
)
AS BEGIN
	UPDATE Persona SET habilitado = 0 WHERE idPersona = @id
END
GO


GO
CREATE PROCEDURE getDoctor(
	@id int
)
AS BEGIN
	SELECT nombre, apPaterno, ISNULL(apMaterno, '') AS apMaterno, curp, altura, peso, idTipoSangre, idTipoUsuario, correo, usuario   FROM Persona per INNER JOIN Paciente p ON
	per.idPersona = p.idPersona
	WHERE p.idPersona = @id;
END
GO


GO
CREATE PROCEDURE getReceptionist(
	@id int
)
AS BEGIN
	SELECT * FROM Datos_Recepcionista
	WHERE idPersona = @id;
END
GO


GO
ALTER PROCEDURE createAppointment(
	@idPatient int,
	@idEspeciality int,
	@datetime varchar(19),
	@idDoctor int
) AS BEGIN
	DECLARE @newDateTime datetime
	SET @newDateTime = CAST(@datetime AS datetime)

	INSERT INTO Cita (idDoctor, idPaciente, fechaHora, idTipoCita) VALUES 
	(@idDoctor, @idPatient, @datetime, @idEspeciality)

	SELECT @@IDENTITY AS idCita
END
GO

UPDATE Cita SET fechaHora = GETDATE() WHERE idCita = 19
SELECT * FROM Persona
SELECT * FROM Cita

GO
ALTER PROCEDURE listDoctorsForAppointment(
	@idAppointmentType int
)
AS BEGIN
	IF @idAppointmentType = 1
		SELECT d.idPersona, d.cedula, d.idHorario, p.nombre, p.apPaterno, p.apMaterno FROM Doctor d INNER JOIN Persona p ON d.idPersona = p.idPersona
		WHERE p.habilitado = 1
	ELSE
		SELECT dtc.idPersona, dtc.idTipoCita, d.cedula, d.idHorario, p.nombre, p.apPaterno, p.apMaterno FROM DoctoresTipoCita dtc INNER JOIN Doctor d
		ON dtc.idPersona = d.idPersona INNER JOIN Persona p
		ON d.idPersona = p.idPersona
		WHERE dtc.idTipoCita = @idAppointmentType AND p.habilitado = 1
END
GO


GO
CREATE PROCEDURE listAppointmentsByUser(
	@idUser int
) AS BEGIN
	DECLARE @typeUser int

	SELECT @typeUser = idTipoUsuario FROM Persona WHERE idPersona = @idUser

	IF @typeUser = 1
	SELECT idCita, fecha, hora, nombreDoctor, apPaternoDoctor, apMaternoDoctor, tipoCita, estadoCita, idConsultorio FROM informacion_cita WHERE idPaciente = @idUser
	ELSE IF @typeUser = 2
	SELECT idCita, fecha, hora, nombrePaciente, apPaternoPaciente, apMaternoPaciente, tipoCita, estadoCita, idPaciente FROM informacion_cita WHERE idDoctor = @idUser
	ELSE IF @typeUser = 3
	SELECT idCita, idPaciente, idDoctor, fecha, hora, nombrePaciente, apPaternoPaciente, apMaternoPaciente,
	nombreDoctor, apPaternoDoctor, apMaternoDoctor, tipoCita, estadoCita, idConsultorio FROM informacion_cita
	ELSE
	SELECT * FROM Cita

END
GO


GO
ALTER PROCEDURE listAppointmentsByIdAndSchedule(
	@idDoctor int,
	@idPatient int,
	@date date
) AS BEGIN
	SELECT * FROM informacion_cita WHERE (idDoctor = @idDoctor OR idPaciente = @idPatient) AND fecha = @date
END
GO


GO
CREATE PROCEDURE editAppointment(
	@id int,
	@date date,
	@time time,
	@idState int
) AS BEGIN
	DECLARE @newDateTime datetime
	DECLARE @oldDateTime datetime

	SELECT @oldDateTime = fechaHora FROM informacion_cita WHERE idCita = @id
	SET @newDateTime = (CAST(@time AS datetime) + CAST(@date AS datetime))

	IF(GETDATE() < DATEADD(WEEK, -1, @oldDateTime) OR @newDateTime = @oldDateTime)
		UPDATE Cita SET fechaHora = @newDateTime, idEstadoCita = @idState WHERE idCita = @id
	ELSE
		UPDATE Cita SET fechaHora = @newDateTime, idEstadoCita = @idState, costo = 90 WHERE idCita = @id
END
GO


GO
CREATE PROCEDURE listConsultationsByUser(
	@idUser int
) AS BEGIN
	DECLARE @typeUser int

	SELECT @typeUser = idTipoUsuario FROM Persona WHERE idPersona = @idUser

	IF @typeUser = 1
	SELECT * FROM Consultas WHERE idPaciente = @idUser
	ELSE IF @typeUser = 2
	SELECT * FROM Consultas WHERE idDoctor = @idUser
	ELSE IF @typeUser = 3
	SELECT * FROM Consultas
	ELSE
	SELECT * FROM Cita
END
GO


GO
CREATE PROCEDURE createDoctor(
	@user nvarchar(30),
	@curp nvarchar(30),
	@mail nvarchar(30),
	@name nvarchar(30),
	@fatherLastName nvarchar(30),
	@motherLastName nvarchar(30),
	@password nvarchar(120),
	@idSchedule int,
	@idConsulting int,
	@professionalID int
) AS BEGIN
	DECLARE @idDoctor int

	INSERT INTO Persona (usuario, curp, contrasena, nombre, apPaterno, apMaterno, correo, idTipoUsuario)
	VALUES (@user, @curp, @password, @name, @fatherLastName, @motherLastName, @mail, 2)

	SELECT @idDoctor = idPersona FROM Persona WHERE usuario = @user

	INSERT INTO Doctor (idPersona, cedula, idConsultorio, idHorario)
	VALUES (@idDoctor, @professionalID, @idConsulting, @idSchedule)

	SELECT * FROM Datos_Doctor WHERE idPersona = @idDoctor
END
GO


GO
CREATE PROCEDURE createReceptionist (
	@user nvarchar(30),
	@curp nvarchar(30),
	@mail nvarchar(30),
	@name nvarchar(30),
	@fatherLastName nvarchar(30),
	@motherLastName nvarchar(30),
	@password nvarchar(120),
	@idConsulting int
) AS BEGIN
	DECLARE @idReceptionist int

	INSERT INTO Persona (usuario, curp, contrasena, nombre, apPaterno, apMaterno, correo, idTipoUsuario)
	VALUES (@user, @curp, @password, @name, @fatherLastName, @motherLastName, @mail, 3)

	SELECT @idReceptionist = idPersona FROM Persona WHERE usuario = @user

	INSERT INTO Recepcionista (idPersona, idConsultorio)
	VALUES (@idReceptionist, @idConsulting)

	SELECT * FROM Persona WHERE idPersona = @idReceptionist
END
GO


GO
CREATE PROCEDURE createConsultation (
	@id int,
	@cost int,
	@note nvarchar(200)
) AS BEGIN
	INSERT INTO Consulta (idConsulta, notaMedica, costo)
	VALUES (@id, @note, @cost)

	UPDATE Cita SET idEstadoCita = 3 WHERE idCita = @id
END
GO


GO
CREATE PROCEDURE addServiceToConsultation (
	@id int,
	@service int
) AS BEGIN
	INSERT INTO ConsultaServicio (idConsulta, idServicio)
	VALUES (@id, @service)
END
GO


GO
CREATE PROCEDURE createPrescription (
	@id int,
	@tip nvarchar(200)
) AS BEGIN
	INSERT INTO Receta (idReceta, recomendaciones)
	VALUES (@id, @tip)
END
GO


GO
CREATE PROCEDURE addSupply (
	@idMedicine int,
	@idPrescription int,
	@quantity int,
	@description nvarchar(100)
) AS BEGIN
	INSERT INTO Suministro (idReceta, idMedicamento, descripcion, cantidad)
	VALUES (@idPrescription, @idMedicine, @description, @quantity)
END
GO


GO
CREATE PROCEDURE deletePatient (
	@id int
) AS BEGIN
	DECLARE @appointments INT

	SELECT @appointments = COUNT(idCita) FROM informacion_cita WHERE idPaciente = @id AND estadoCita = 'Pendiente'

	IF (@appointments > 0) BEGIN
		UPDATE Persona SET habilitado = 0 WHERE idPersona = @id
		SELECT 1 AS success
	END
END
GO


GO
CREATE PROCEDURE deleteDoctor (
	@id int
) AS BEGIN
	DECLARE @appointments INT

	SELECT @appointments = COUNT(idCita) FROM informacion_cita WHERE idDoctor = @id AND estadoCita = 'Pendiente'

	IF (@appointments > 0) BEGIN
		UPDATE Persona SET habilitado = 0 WHERE idPersona = @id
		SELECT 1 AS success
	END
END
GO


GO
CREATE PROCEDURE cancelAppointment (
	@id int
) AS BEGIN
	UPDATE Cita SET idEstadoCita = 2 WHERE idCita = @id
END
GO


GO
CREATE PROCEDURE updateAppointment (
	@id int,
	@doctor int,
	@type int,
	@date date,
	@time varchar(8)
) AS BEGIN
	UPDATE Cita SET idDoctor = @doctor, idTipoCita = @type, fechaHora = CAST(@date AS DATETIME) + CAST(@time AS DATETIME)
	WHERE idCita = @id
END
GO


GO
ALTER PROCEDURE addSpeciality (
	@idDoctor int,
	@speciality int
) AS BEGIN
	INSERT INTO DoctorEspecialidad (idEspecialidad, idDoctor)
	VALUES (@speciality, @idDoctor)
END
GO


GO
CREATE PROCEDURE createPurchase (
	@patient int,
	@payment int
) AS BEGIN
	INSERT INTO Compra (idPaciente, idMetodoPago, fechaHora)
	VALUES (@patient, @payment, GETDATE())

	SELECT @@IDENTITY AS idCompra
END
GO


GO
ALTER PROCEDURE addOrder (
	@id int,
	@medicine int,
	@quantity int
) AS BEGIN
	INSERT INTO Pedido (idCompra, idMedicamento, cantidad)
	VALUES (@id, @medicine, @quantity)

	UPDATE Medicamento SET cantidad = cantidad - @quantity WHERE idMedicamento = @id
END
GO


GO
CREATE PROCEDURE updateInventory(
	@id int,
	@quantity int
) AS BEGIN
	UPDATE Medicamento SET cantidad = @quantity WHERE idMedicamento = @id
END
GO