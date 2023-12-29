
-- ADDING DATA
INSERT INTO TipoUsuario VALUES('Paciente')
INSERT INTO TipoUsuario VALUES('Doctor')
INSERT INTO TipoUsuario VALUES('Recepcionista')

INSERT INTO Persona (usuario, curp, contrasena, nombre, apPaterno, apMaterno, correo, idTipoUsuario)
VALUES
    ('paciente1', 'LOMA123456HDFPN89', 'pass123', 'Juan', 'G�mez', 'P�rez', 'juan@gmail.com', 1),
    ('doctorA', 'GORA456789HGHJKL01', 'pass456', 'Mar�a', 'L�pez', 'Gonz�lez', 'maria@gmail.com', 2),
    ('recepcionista_1', 'LORE789012QTERTYU', 'pass789', 'Luis', 'Mart�nez', 'Ram�rez', 'luis@gmail.com', 3),
    ('paciente2', 'AGLA234567BCDFEF90', 'pass234', 'Ana', 'Hern�ndez', 'S�nchez', 'ana@gmail.com', 1),
    ('doctorB', 'RODI567890XFVBNM12', 'pass567', 'Roberto', 'D�az', 'Garc�a', 'roberto@gmail.com', 2),
    ('recepcionista_2', 'ELRU890123IOPYTRE', 'pass890', 'Elena', 'Ruiz', 'Mendoza', 'elena@gmail.com', 3),
    ('paciente3', 'CARM345678JKLQWERT', 'pass345', 'Carlos', 'Ram�rez', 'Fern�ndez', 'carlos@gmail.com', 1),
    ('doctorC', 'LAGU678901YDFGHJK', 'pass678', 'Laura', 'Guti�rrez', 'Jim�nez', 'laura@gmail.com', 2),
    ('recepcionista_3', 'DASA901234ZXCVBNM', 'pass901', 'Daniel', 'S�nchez', 'L�pez', 'daniel@gmail.com', 3),
    ('paciente4', 'ISAG456789WERTYUI', 'pass456', 'Isabel', 'Garc�a', 'P�rez', 'isabel@gmail.com', 1),
    ('doctorD', 'JATO789012FGHJKLMN', 'pass789', 'Javier', 'Torres', 'Vargas', 'javier@gmail.com', 2),
    ('recepcionista_4', 'MAP�012345BNMSDFG', 'pass012', 'Marta', 'P�rez', 'G�mez', 'marta@gmail.com', 3),
    ('paciente5', 'ALJI567890OPLKJHG', 'pass567', 'Alejandro', 'Jim�nez', 'Rodr�guez', 'alejandro@gmail.com', 1),
    ('doctorE', 'SOFU890123LKJHGFDS', 'pass890', 'Sof�a', 'Fern�ndez', 'Santos', 'sofia@gmail.com', 2),
    ('recepcionista_5', 'PABO901234MLKJHGF', 'pass901', 'Pablo', 'Mendoza', 'Hern�ndez', 'pablo@gmail.com', 3),
    ('paciente6', 'NAGO678901BNVCXZL', 'pass678', 'Natalia', 'Vargas', 'G�mez', 'natalia@gmail.com', 1),
    ('doctorF', 'RARA901234QWERTYUI', 'pass901', 'Ra�l', 'Santos', 'L�pez', 'raul@gmail.com', 2),
    ('recepcionista_6', 'CAHE012345POIUYTR', 'pass012', 'Carmen', 'Hern�ndez', 'Mart�nez', 'carmen@gmail.com', 3),
    ('paciente7', 'DIER789012LKJHGFD', 'pass789', 'Diego', 'Rodr�guez', 'P�rez', 'diego@gmail.com', 1),
    ('doctorG', 'ADGO012345LKJHGFDS', 'pass012', 'Adriana', 'G�mez', 'Jim�nez', 'adriana@gmail.com', 2),
    ('recepcionista_7', 'JORP901234NBVCXZL', 'pass901', 'Jorge', 'P�rez', 'Garc�a', 'jorge@gmail.com', 3);

	SELECT * FROM Persona

INSERT INTO Persona (usuario, curp, contrasena, nombre, apPaterno, apMaterno, correo, idTipoUsuario)
VALUES
    ('paciente8', 'LOMA123456HDFPN89', 'pass123', 'Gabriela', 'Gonz�lez', 'L�pez', 'gabriela@gmail.com', 1),
    ('doctorH', 'GORA456789HGHJKL01', 'pass456', 'H�ctor', 'Hern�ndez', 'Mendoza', 'hector@gmail.com', 2),
    ('recepcionista_8', 'LORE789012QTERTYU', 'pass789', 'Rosa', 'Ram�rez', 'S�nchez', 'rosa@gmail.com', 3),
    ('paciente9', 'AGLA234567BCDFEF90', 'pass234', 'Andr�s', 'Hern�ndez', 'Santos', 'andres@gmail.com', 1),
    ('doctorI', 'RODI567890XFVBNM12', 'pass567', 'Irene', 'D�az', 'Mart�nez', 'irene@gmail.com', 2),
    ('recepcionista_9', 'ELRU890123IOPYTRE', 'pass890', 'Eduardo', 'Ruiz', 'Garc�a', 'eduardo@gmail.com', 3),
    ('paciente10', 'CARM345678JKLQWERT', 'pass345', 'Catalina', 'Ram�rez', 'Fern�ndez', 'catalina@gmail.com', 1),
    ('doctorJ', 'LAGU678901YDFGHJK', 'pass678', 'Joaqu�n', 'Guti�rrez', 'Jim�nez', 'joaquin@gmail.com', 2),
    ('recepcionista_10', 'DASA901234ZXCVBNM', 'pass901', 'Diana', 'S�nchez', 'L�pez', 'diana@gmail.com', 3);

INSERT INTO Consultorio (piso, telefono)
VALUES
    (1, '555-111-1111'),
    (2, '555-222-2222'),
    (3, '555-333-3333'),
    (1, '555-444-4444'),
    (2, '555-555-5555'),
    (3, '555-666-6666'),
    (1, '555-666-7777');

INSERT INTO Recepcionista (idPersona, idConsultorio)
VALUES
    (3, 1),
    (6, 2),
    (9, 3),
    (12, 4),
    (15, 5), 
    (18, 6),
	(21, 7)

INSERT INTO TipoSangre VALUES
    ('O+'),
    ('A+'),
    ('B+'),
    ('AB+'),
    ('O-'),
    ('A-'),
    ('B-'),
    ('AB-');

INSERT INTO Paciente (idPersona, peso, altura, idTipoSangre)
VALUES
    (1, 70, 175, 1), -- Juan (paciente1)
    (4, 65, 160, 2), -- Ana (paciente2)
    (7, 80, 180, 3), -- Carlos (paciente3)
    (10, 55, 150, 4), -- Isabel (paciente4)
    (13, 72, 178, 1), -- Alejandro (paciente5)
    (16, 68, 172, 2), -- Natalia (paciente6)
    (19, 75, 185, 3), -- Diego (paciente7)
	(22, 72, 178, 4), -- Alejandro (paciente5)
    (25, 68, 172, 1), -- Natalia (paciente6)
    (28, 75, 185, 2); -- Diego (paciente7)

SELECT * FROM Paciente

INSERT INTO Horario (horaInicio, horaFin)
VALUES
    ('08:00:00', '16:00:00'), -- Horario Matutino de 8 horas
    ('16:00:00', '00:00:00'), -- Horario Vespertino de 8 horas
    ('00:00:00', '08:00:00'); -- Horario Nocturno de 8 horas

INSERT INTO Doctor (idPersona, cedula, idConsultorio, idHorario)
VALUES
    (2, 123456, 1, 1), -- DoctorA
    (5, 789012, 2, 1), -- DoctorB
    (8, 901234, 3, 1), -- DoctorC
    (11, 234567, 1, 2), -- DoctorD
    (14, 567890, 2, 2), -- DoctorE
    (17, 901234, 3, 3), -- DoctorF
	(20, 465738, 1, 2), -- DoctorD
    (24, 593927, 2, 2), -- DoctorE
    (27, 069362, 2, 2), -- DoctorE
    (30, 486245, 3, 3); -- DoctorF

SELECT * FROM Doctor

INSERT INTO Especialidad (especialidad) VALUES
    ('Cardiolog�a'),
    ('Dermatolog�a'),
    ('Gastroenterolog�a'),
    ('Neurolog�a'),
    ('Oftalmolog�a'),
    ('Oncolog�a'),
    ('Pediatr�a'),
    ('Psiquiatr�a'),
    ('Traumatolog�a'),
    ('Urolog�a');

INSERT INTO DoctorEspecialidad (idEspecialidad, idDoctor)
VALUES
    (1, 2),
    (2, 5),
    (3, 8), 
    (4, 11),
    (5, 14),
    (6, 17),
	(7, 2),
    (8, 5),
    (9, 8),
    (10, 11);

INSERT INTO TipoCita (tipoCita) VALUES
    ('Consulta general'),
    ('Consulta cardiol�gica'),
    ('Consulta dermatol�gica'),
    ('Consulta gastroenterol�gica'),
    ('Consulta neurol�gica'),
    ('Consulta oftalmol�gica'),
    ('Consulta oncol�gica'),
    ('Consulta pedi�trica'),
    ('Consulta psiqui�trica'),
    ('Consulta traumatol�gica'),
    ('Consulta urol�gica');

INSERT INTO EspecialidadTipoCita (idEspecialidad, idTipoCita) VALUES
(1, 2),  -- Consulta General
(2, 3),  -- Consulta Psiqui�trica
(3, 4),  -- Consulta Cardiol�gica
(4, 5),  -- Consulta Dermatol�gica
(5, 6),  -- Consulta Gastroenterol�gica
(6, 7),  -- Consulta Neurol�gica
(7, 8),  -- Consulta Oftalmol�gica
(8, 9),  -- Consulta Oncol�gica
(9, 10),  -- Consulta Pedi�trica
(10, 11); -- Consulta Traumatol�gica

INSERT INTO EstadoCita (estadoCita)
VALUES
    ('Pendiente'),
    ('Cancelada'),
    ('Completada');

INSERT INTO Cita (idDoctor, idPaciente, fechaHora, idTipoCita, idEstadoCita)
VALUES
    (2, 1, '2023-12-15 10:00:00', 1, 1), -- Cita 1
    (5, 4, '2023-12-16 14:30:00', 2, 2), -- Cita 2
    (8, 7, '2023-12-17 11:15:00', 3, 3), -- Cita 3
    (11, 10, '2023-12-18 09:45:00', 1, 1), -- Cita 4
    (14, 13, '2023-12-19 16:00:00', 2, 2), -- Cita 5
    (17, 16, '2023-12-20 13:30:00', 3, 3), -- Cita 6
    (2, 19, '2023-12-21 08:00:00', 1, 1), -- Cita 7
    (5, 1, '2023-12-22 14:30:00', 2, 2), -- Cita 8
    (8, 4, '2023-12-23 11:15:00', 3, 3), -- Cita 9
    (11, 7, '2023-12-24 09:45:00', 1, 1); -- Cita 10

SELECT * FROM Cita

INSERT INTO Consulta (idConsulta, notaMedica, costo)
VALUES
    (3, 'Examen f�sico normal. Receta: Paracetamol.', 150), -- Cita 3
    (6, 'Resultados de radiograf�a positivos. Recomendaci�n: Seguimiento con especialista.', 200), -- Cita 6
    (8, 'Consulta de rutina. Receta: Vitaminas.', 120); -- Cita 8

INSERT INTO Servicio (servicio, precio)
VALUES
    ('Suministro de Medicamento', 50),
    ('Inyecci�n', 30),
    ('Radiograf�a', 120),
    ('An�lisis de Sangre', 80),
    ('Ecograf�a', 200),
    ('Terapia F�sica', 100),
    ('Endoscopia', 180),
    ('Resonancia Magn�tica', 250);

INSERT INTO ConsultaServicio (idConsulta, idServicio)
VALUES
    (3, 1), -- Suministro de Medicamento para Cita 3
    (3, 4), -- An�lisis de Sangre para Cita 3
    (6, 3), -- Radiograf�a para Cita 6
    (6, 6), -- Terapia F�sica para Cita 6
    (8, 1), -- Suministro de Medicamento para Cita 8
    (8, 5); -- Ecograf�a para Cita 8

INSERT INTO Receta (idReceta, recomendaciones)
VALUES
    (3, 'Reposo recomendado.'), -- Receta 1
    (6, 'Seguir tratamiento de terapia f�sica tres veces por semana durante un mes.'), -- Receta 2
    (8, 'Iniciar tratamiento con vitaminas. Evitar esfuerzos f�sicos excesivos.'); -- Receta 3

INSERT INTO Medicamento (medicamento, precio, cantidad)
VALUES
    ('Paracetamol', 10, 100),
    ('Ibuprofeno', 15, 80),
    ('Amoxicilina', 20, 50),
    ('Omeprazol', 18, 60),
    ('Aspirina', 8, 120),
    ('Vitamina C', 12, 70),
    ('Diazepam', 25, 40),
    ('Atorvastatina', 30, 30),
    ('Insulina', 50, 20),
    ('Hidroclorotiazida', 22, 45),
    ('Sildenafil', 40, 25),
    ('Metformina', 15, 55),
    ('Lorazepam', 28, 35),
    ('Lisinopril', 18, 40),
    ('Citalopram', 20, 30),
    ('Warfarina', 35, 15),
    ('Rosuvastatina', 32, 25),
    ('Fluoxetina', 17, 50),
    ('Losartan', 23, 40),
    ('Levothyroxine', 15, 60);

INSERT INTO Suministro (idReceta, idMedicamento, descripcion, cantidad)
VALUES
    (3, 1, 'Paracetamol para aliviar el dolor', 15), -- Receta 1
    (6, 6, 'Terapia f�sica con Vitamina C', 10), -- Receta 2
	(8, 1, 'Suministro de Paracetamol para aliviar el dolor', 10), -- Receta 3
    (8, 5, 'Suministro de Aspirina como antiinflamatorio', 5); -- Receta 3

INSERT INTO MetodoPago (metodoPago)
VALUES
    ('Tarjeta de Cr�dito'),
    ('Tarjeta de D�bito'),
    ('Transferencia Bancaria'),
    ('Efectivo');

INSERT INTO Compra (idPaciente, idMetodoPago, fechaHora)
VALUES
    (1, 1, '2023-12-15 12:30:00'), -- Juan (paciente1) con Tarjeta de Cr�dito
    (4, 2, '2023-12-16 14:45:00'), -- Ana (paciente2) con Tarjeta de D�bito
    (7, 3, '2023-12-17 10:00:00'), -- Carlos (paciente3) con Transferencia Bancaria
    (10, 4, '2023-12-18 11:15:00'), -- Isabel (paciente4) con Efectivo
    (13, 3, '2023-12-19 13:30:00'), -- Alejandro (paciente5) con Transferencia Bancaria
    (16, 1, '2023-12-20 15:00:00'), -- Natalia (paciente6) con Tarjeta de Cr�dito
    (19, 2, '2023-12-21 09:45:00'); -- Diego (paciente7) con Tarjeta de D�bito

INSERT INTO Pedido (idCompra, idMedicamento, cantidad)
VALUES
    (1, 1, 2),  -- Juan (paciente1) compr� 2 unidades de Paracetamol
    (2, 3, 1),  -- Ana (paciente2) compr� 1 unidad de Amoxicilina
    (3, 5, 3),  -- Carlos (paciente3) compr� 3 unidades de Aspirina
    (4, 8, 1),  -- Isabel (paciente4) compr� 1 unidad de Atorvastatina
    (5, 12, 2), -- Alejandro (paciente5) compr� 2 unidades de Metformina
    (6, 17, 1), -- Natalia (paciente6) compr� 1 unidad de Warfarina
    (7, 20, 4); -- Diego (paciente7) compr� 4 unidades de Levothyroxine
