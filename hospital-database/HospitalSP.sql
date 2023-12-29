-- STORED PROCEDURES
GO
CREATE PROCEDURE iniciarSesion(
	@username nvarchar(30)
)
AS BEGIN
	SELECT * FROM Persona WHERE usuario = @username
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
	(@name, @fatherLastName, @motherLastName, @user, @curp, @password, 2, @mail);

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
CREATE PROCEDURE createAppointment(
	@idPacient int,
	@idEspeciality int,
	@date datetime,
	@idDoctor int
) AS BEGIN
	INSERT INTO Cita (idDoctor, idPaciente, fechaHora, idTipoCita) VALUES 
	(@idDoctor, @idPacient, @date, @idEspeciality)
END
GO


GO
CREATE PROCEDURE listDoctorsForAppointment(
	@idAppointmentType int
)
AS BEGIN
	SELECT dtc.idPersona, dtc.idTipoCita, d.cedula, d.idHorario, p.nombre, p.apPaterno, p.apMaterno FROM DoctoresTipoCita dtc INNER JOIN Doctor d
	ON dtc.idPersona = d.idPersona INNER JOIN Persona p
	ON d.idPersona = p.idPersona
	WHERE dtc.idTipoCita = @idAppointmentType
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
EXEC listAppointmentsByUser 5


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
CREATE PROCEDURE cancelAppointment(
	@id int
) AS BEGIN
	DECLARE @oldDateTime datetime

	SELECT @oldDateTime = fechaHora FROM informacion_cita WHERE idCita = @id
	IF(GETDATE() < DATEADD(WEEK, -1, @oldDateTime))
		UPDATE Cita SET idEstadoCita = 2, costo = 90 WHERE idCita = @id
	ELSE
		UPDATE Cita SET idEstadoCita = 2 WHERE idCita = @id
END
GO

