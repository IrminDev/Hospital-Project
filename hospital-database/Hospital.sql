DROP DATABASE Hospital
CREATE DATABASE Hospital
USE Hospital

CREATE TABLE TipoUsuario(
	idTipoUsuario int IDENTITY(1,1) NOT NULL,
	tipoUsuario nvarchar(20) NOT NULL,
	CONSTRAINT PK_TipoUsuario PRIMARY KEY CLUSTERED(idTipoUsuario)
)

CREATE TABLE Persona(
	idPersona int IDENTITY(1,1) NOT NULL,
	usuario nvarchar(20) NOT NULL,
	curp nvarchar(18),
	correo nvarchar(40) NOT NULL,
	contrasena nvarchar(120) NOT NULL,
	nombre nvarchar(20) NOT NULL,
	apPaterno nvarchar(20) NOT NULL,
	apMaterno nvarchar(20),
	idTipoUsuario int NOT NULL,
	habilitado bit DEFAULT 1,
	CONSTRAINT PK_Persona PRIMARY KEY CLUSTERED(idPersona),
	CONSTRAINT FK_Persona_TipoUsuario FOREIGN KEY (idTipoUsuario) REFERENCES TipoUsuario (idTipoUsuario) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE Consultorio(
	idConsultorio int IDENTITY(1,1) NOT NULL,
	piso int NOT NULL,
	telefono nvarchar(12) NOT NULL,
	CONSTRAINT PK_Consultorio PRIMARY KEY CLUSTERED(idConsultorio)
)

CREATE TABLE Recepcionista(
	idPersona int NOT NULL,
	idConsultorio int NOT NULL,
	CONSTRAINT PK_Recepcionista PRIMARY KEY CLUSTERED(idPersona),
	CONSTRAINT FK_Recepcionista_Persona FOREIGN KEY (idPersona) REFERENCES Persona (idPersona) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Recepcionista_Consultorio FOREIGN KEY (idConsultorio) REFERENCES Consultorio (idConsultorio) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE TipoSangre(
	idTipoSangre int IDENTITY(1,1) NOT NULL,
	tipoSangre nvarchar(20) NOT NULL,
	CONSTRAINT PK_TipoSangre PRIMARY KEY CLUSTERED(idTipoSangre)
)

CREATE TABLE Paciente(
	idPersona int NOT NULL,
	peso int NOT NULL,
	altura int NOT NULL,
	idTipoSangre int NOT NULL,
	CONSTRAINT PK_Paciente PRIMARY KEY CLUSTERED(idPersona),
	CONSTRAINT FK_Paciente_Persona FOREIGN KEY (idPersona) REFERENCES Persona (idPersona) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Paciente_TipoSangre FOREIGN KEY (idTipoSangre) REFERENCES TipoSangre (idTipoSangre) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE Horario(
	idHorario int IDENTITY(1,1) NOT NULL,
	horaInicio time NOT NULL,
	horaFin time NOT NULL,
	CONSTRAINT PK_Horario PRIMARY KEY CLUSTERED(idHorario)
)

CREATE TABLE Doctor(
	idPersona int NOT NULL,
	cedula int NOT NULL,
	idConsultorio int,
	idHorario int,
	CONSTRAINT PK_Doctor PRIMARY KEY CLUSTERED(idPersona),
	CONSTRAINT FK_Doctor_Persona FOREIGN KEY (idPersona) REFERENCES Persona (idPersona) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Doctor_Consultorio FOREIGN KEY (idConsultorio) REFERENCES Consultorio (idConsultorio) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Doctor_Horario FOREIGN KEY (idHorario) REFERENCES Horario (idHorario) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE Especialidad(
	idEspecialidad int IDENTITY(1,1) NOT NULL,
	especialidad nvarchar(20) NOT NULL
	CONSTRAINT PK_Especialidad PRIMARY KEY CLUSTERED(idEspecialidad)
)

CREATE TABLE DoctorEspecialidad(
	idEspecialidad int NOT NULL,
	idDoctor int NOT NULL,
	CONSTRAINT FK_Doctor_DocEsp FOREIGN KEY (idDoctor) REFERENCES Doctor (idPersona) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Especialidad_DocEsp FOREIGN KEY (idEspecialidad) REFERENCES Especialidad (idEspecialidad) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE TipoCita(
	idTipoCita int IDENTITY(1,1) NOT NULL,
	tipoCita nvarchar(30) NOT NULL,
	CONSTRAINT PK_TipoCita PRIMARY KEY CLUSTERED(idTipoCita)
)

CREATE TABLE EspecialidadTipoCita(
	idEspecialidad int,
	idTipoCita int,
	CONSTRAINT FK_TipoCita_EspCita FOREIGN KEY (idTipoCita) REFERENCES TipoCita (idTipoCita) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Especialidad_EspCita FOREIGN KEY (idEspecialidad) REFERENCES Especialidad (idEspecialidad) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE EstadoCita(
	idEstadoCita int IDENTITY(1,1) NOT NULL,
	estadoCita nvarchar(15)	NOT NULL,
	CONSTRAINT PK_EstadoCita PRIMARY KEY CLUSTERED(idEstadoCita)
)

CREATE TABLE Cita(
	idCita int IDENTITY(1,1) NOT NULL,
	idDoctor int NOT NULL,
	idPaciente int NOT NULL,
	fechaHora datetime NOT NULL,
	idTipoCita int NOT NULL,
	idEstadoCita int DEFAULT 1 NOT NULL,
	costo int NOT NULL default 0,
	CONSTRAINT PK_Cita PRIMARY KEY CLUSTERED(idCita),
	CONSTRAINT FK_Cita_TipoCita FOREIGN KEY (idTipoCita) REFERENCES TipoCita (idTipoCita) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Cita_EstadoCita FOREIGN KEY (idEstadoCita) REFERENCES EstadoCita (idEstadoCita) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Cita_Paciente FOREIGN KEY (idPaciente) REFERENCES Paciente (idPersona) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Cita_Doctor FOREIGN KEY (idDoctor) REFERENCES Doctor (idPersona) ON DELETE NO ACTION ON UPDATE NO ACTION
)

CREATE TABLE Consulta(
	idConsulta int NOT NULL,
	notaMedica nvarchar(200) NOT NULL,
	costo int NOT NULL
	CONSTRAINT PK_Consulta PRIMARY KEY CLUSTERED(idConsulta),
	CONSTRAINT FK_Consulta_Cita FOREIGN KEY (idConsulta) REFERENCES Cita (idCita) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE Servicio(
	idServicio int IDENTITY(1,1) NOT NULL,
	servicio nvarchar(30) NOT NULL,
	precio int NOT NULL
	CONSTRAINT PK_Servicio PRIMARY KEY CLUSTERED(idServicio)
)

CREATE TABLE ConsultaServicio(
	idConsulta int NOT NULL,
	idServicio int NOT NULL,
	CONSTRAINT FK_ConsultaServicio_Consulta FOREIGN KEY (idConsulta) REFERENCES Consulta (idConsulta) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_ConsultaServicio_Servicio FOREIGN KEY (idServicio) REFERENCES Servicio (idServicio) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE Receta(
	idReceta int NOT NULL,
	recomendaciones nvarchar(200)
	CONSTRAINT PK_Receta PRIMARY KEY CLUSTERED(idReceta),
	CONSTRAINT FK_Receta_Consulta FOREIGN KEY (idReceta) REFERENCES Consulta (idConsulta) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE Medicamento(
	idMedicamento int IDENTITY(1,1) NOT NULL,
	medicamento nvarchar(30) NOT NULL,
	precio int NOT NULL,
	cantidad int NOT NULL
	CONSTRAINT PK_Medicamento PRIMARY KEY CLUSTERED(idMedicamento)
)

CREATE TABLE Suministro(
	idReceta int NOT NULL,
	idMedicamento int NOT NULL,
	descripcion nvarchar(100) NOT NULL,
	cantidad int NOT NULL
	CONSTRAINT FK_Suministro_Receta FOREIGN KEY (idReceta) REFERENCES Receta (idReceta) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Suministro_Medicamento FOREIGN KEY (idMedicamento) REFERENCES Medicamento (idMedicamento) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE MetodoPago(
	idMetodoPago int IDENTITY(1,1) NOT NULL,
	metodoPago nvarchar(30) NOT NULL,
	CONSTRAINT PK_MetodoPago PRIMARY KEY CLUSTERED(idMetodoPago)
)

CREATE TABLE Compra(
	idCompra int IDENTITY(1,1) NOT NULL,
	idPaciente int NOT NULL,
	idMetodoPago int NOT NULL,
	fechaHora datetime NOT NULL,
	CONSTRAINT PK_Compra PRIMARY KEY CLUSTERED(idCompra),
	CONSTRAINT FK_Compra_Paciente FOREIGN KEY (idPaciente) REFERENCES Paciente (idPersona) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Compra_MetodoPago FOREIGN KEY (idMetodoPago) REFERENCES MetodoPago (idMetodoPago) ON DELETE CASCADE ON UPDATE CASCADE,
)

CREATE TABLE Pedido(
	idCompra int NOT NULL,
	idMedicamento int NOT NULL,
	cantidad int NOT NULL,
	CONSTRAINT FK_Pedido_Medicamento FOREIGN KEY (idMedicamento) REFERENCES Medicamento (idMedicamento) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Pedido_Compra FOREIGN KEY (idCompra) REFERENCES Compra (idCompra) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE Bitacora_histmedico(
	id INT IDENTITY NOT NULL, 
	fecha DATETIME DEFAULT NULL,
	usuario VARCHAR(100) NOT NULL,
	idPaciente INT NOT NULL,
	nombrePaciente VARCHAR(50) NOT NULL, 
	diagnostico VARCHAR(100) NOT NULL,
	consultorio INT NOT NULL,
	costoTotal INT NOT NULL,
	PRIMARY KEY (ID)
);
