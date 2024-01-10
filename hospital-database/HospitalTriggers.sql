GO
ALTER TRIGGER verificar_cita
ON Cita
AFTER update
AS 
BEGIN
	set nocount on;
	IF EXISTS(
		select 1 from inserted i where i.fechaHora is not null and ABS(DATEDIFF(HH, i.fechaHora, GETDATE())) < 24 
	)
	BEGIN
		update Cita
		set costo = c.costo + 90 
		from Cita c 
		inner join inserted i on c.idCita = i.idCita
	END
END
GO


GO
ALTER TRIGGER validate_date 
	ON Cita 
	AFTER INSERT
AS
BEGIN
	DECLARE @date datetime 
	SET @date = (select top 1 fechaHora from inserted)
	DECLARE @currentdate datetime
	SET @currentdate = getdate()
	IF ABS(datediff(day, @date, @currentdate)) < 30
		rollback transaction
END
GO


GO
CREATE TRIGGER TR_INS_Consulta
ON Consulta
AFTER INSERT
AS BEGIN 
	INSERT INTO Bitacora_histmedico(fecha, usuario, idPaciente, nombrePaciente, diagnostico, consultorio, costoTotal)
	SELECT GETDATE(), PACCONN.NombreDoctor, PACCONN.idPaciente, PACCONN.NombrePaciente, ins.notaMedica, PACCONN.idConsultorio, ins.costo FROM inserted AS ins INNER JOIN(
		SELECT PACSINN.*, CONCAT(P.nombre, ' ', P.apPaterno, ' ', ISNULL(P.apMaterno, ' ')) AS NombrePaciente FROM Persona AS P INNER JOIN (
			SELECT Pac.idPersona AS idPaciente, Cita.idCita, Cita.idConsultorio, Cita.NombreDoctor FROM Paciente AS Pac INNER JOIN(
				SELECT Ci.idCita, Ci.idPaciente, Consul.idConsultorio, Consul.NombreDoctor FROM Cita AS Ci INNER JOIN (
					SELECT Doc.idPersona AS idDoctor, CONCAT(Per.nombre, ' ', Per.apPaterno	, ' ', ISNULL(Per.apMaterno, ' ')) AS NombreDoctor, Doc.idConsultorio FROM Doctor AS Doc INNER JOIN Persona AS Per 
					ON Doc.idPersona = Per.idPersona) AS Consul 
				ON Consul.idDoctor = Ci.idDoctor) AS Cita 
			ON Cita.idPaciente = Pac.idPersona) AS PACSINN 
		ON PACSINN.idPaciente = P.idPersona) AS PACCONN 
	ON PACCONN.idCita = ins.idConsulta
END
GO


GO
CREATE TRIGGER TR_UPD_ConsultaServicio
ON ConsultaServicio
AFTER INSERT
AS BEGIN 
	DECLARE @SumaPrecioServicios INT
	SELECT @SumaPrecioServicios = SUM(CONSINS.precio) OVER (PARTITION BY Cons.idConsulta) FROM Consulta AS Cons INNER JOIN (
	SELECT ConsS.idConsulta, Ser.idServicio, Ser.servicio, Ser.precio FROM Servicio AS Ser INNER JOIN ConsultaServicio AS ConsS
	ON Ser.idServicio = ConsS.idServicio) AS CONSINS ON CONSINS.idConsulta = Cons.idConsulta
	UPDATE Bitacora_histmedico SET costoTotal = costoTotal + @SumaPrecioServicios
END
GO