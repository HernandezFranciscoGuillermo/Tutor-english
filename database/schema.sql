-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 31-05-2017 a las 15:28:23
-- Versión del servidor: 5.6.35
-- Versión de PHP: 7.0.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tutor_app`
--
CREATE DATABASE IF NOT EXISTS `tutor_app` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `tutor_app`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acceso`
--

CREATE TABLE `acceso` (
  `id` int(11) NOT NULL,
  `ingreso` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(45) DEFAULT NULL,
  `so` varchar(45) DEFAULT NULL,
  `dispositivo` varchar(45) DEFAULT NULL,
  `platform` varchar(50) DEFAULT NULL,
  `browser` varchar(50) DEFAULT NULL,
  `version` varchar(50) DEFAULT NULL,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejemplos`
--

CREATE TABLE `ejemplos` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `ejemplo` text,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `temas_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `username` varchar(200) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `userimag` varchar(150) DEFAULT 'avatar.png',
  `edad` int(5) NOT NULL,
  `password_hash` text NOT NULL,
  `password_salt` text NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status_id` int(11) NOT NULL,
  `genero_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examen`
--

CREATE TABLE `examen` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `temas_id` int(11) NOT NULL,
  `tipo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

CREATE TABLE `genero` (
  `id` int(11) NOT NULL,
  `genero` varchar(45) DEFAULT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `pregunta` varchar(50) NOT NULL,
  `respuesta` varchar(50) NOT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `examen_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `leccion`
--

CREATE TABLE `leccion` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `leccion` text,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `temas_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listening`
--

CREATE TABLE `listening` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `audio` text,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `temas_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nota`
--

CREATE TABLE `nota` (
  `id` int(11) NOT NULL,
  `nota` int(11) DEFAULT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas_de_los_examenes`
--

CREATE TABLE `notas_de_los_examenes` (
  `nota_id` int(11) NOT NULL,
  `examen_id` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas_estudiantes`
--

CREATE TABLE `notas_estudiantes` (
  `estudiantes_id` int(11) NOT NULL,
  `nota_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pronunciacion`
--

CREATE TABLE `pronunciacion` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `palabra` text,
  `pronunciacion` text,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `temas_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temas`
--

CREATE TABLE `temas` (
  `id` int(11) NOT NULL,
  `tema` varchar(25) DEFAULT NULL,
  `img` varchar(50) DEFAULT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE `tipo` (
  `id` int(11) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(39) NOT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` varchar(45) DEFAULT 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `username` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `userimg` varchar(150) DEFAULT '1493022398_malecostume.png',
  `password_hash` text NOT NULL,
  `password_salt` text NOT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_type_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `genero_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_type`
--

CREATE TABLE `user_type` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usos`
--

CREATE TABLE `usos` (
  `id` int(11) NOT NULL,
  `inreso` timestamp NULL DEFAULT NULL,
  `dispositivo` varchar(50) DEFAULT NULL,
  `so` varchar(50) DEFAULT NULL,
  `version` varchar(50) DEFAULT NULL,
  `modificacion` timestamp NULL DEFAULT NULL,
  `estudiantes_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acceso`
--
ALTER TABLE `acceso`
  ADD PRIMARY KEY (`id`,`users_id`),
  ADD KEY `fk_acceso_users1_idx` (`users_id`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ejemplos`
--
ALTER TABLE `ejemplos`
  ADD PRIMARY KEY (`id`,`temas_id`),
  ADD KEY `fk_ejemplos_temas1_idx` (`temas_id`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`,`status_id`,`genero_id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD KEY `fk_estudiantes_status1_idx` (`status_id`),
  ADD KEY `fk_estudiantes_genero1_idx` (`genero_id`);

--
-- Indices de la tabla `examen`
--
ALTER TABLE `examen`
  ADD PRIMARY KEY (`id`,`temas_id`,`tipo_id`),
  ADD KEY `fk_examen_temas1_idx` (`temas_id`),
  ADD KEY `fk_examen_tipo1_idx` (`tipo_id`);

--
-- Indices de la tabla `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`,`examen_id`),
  ADD KEY `fk_item_examen1_idx` (`examen_id`);

--
-- Indices de la tabla `leccion`
--
ALTER TABLE `leccion`
  ADD PRIMARY KEY (`id`,`temas_id`),
  ADD KEY `fk_leccion_temas1_idx` (`temas_id`);

--
-- Indices de la tabla `listening`
--
ALTER TABLE `listening`
  ADD PRIMARY KEY (`id`,`temas_id`),
  ADD KEY `fk_listening_temas1_idx` (`temas_id`);

--
-- Indices de la tabla `nota`
--
ALTER TABLE `nota`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notas_de_los_examenes`
--
ALTER TABLE `notas_de_los_examenes`
  ADD PRIMARY KEY (`nota_id`,`examen_id`),
  ADD KEY `fk_nota_has_examen_examen1_idx` (`examen_id`),
  ADD KEY `fk_nota_has_examen_nota1_idx` (`nota_id`);

--
-- Indices de la tabla `notas_estudiantes`
--
ALTER TABLE `notas_estudiantes`
  ADD PRIMARY KEY (`id`,`estudiantes_id`,`nota_id`),
  ADD KEY `fk_estudiantes_has_nota_nota1_idx` (`nota_id`),
  ADD KEY `fk_estudiantes_has_nota_estudiantes1_idx` (`estudiantes_id`);

--
-- Indices de la tabla `pronunciacion`
--
ALTER TABLE `pronunciacion`
  ADD PRIMARY KEY (`id`,`temas_id`),
  ADD KEY `fk_pronunciacion_temas1_idx` (`temas_id`);

--
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `temas`
--
ALTER TABLE `temas`
  ADD PRIMARY KEY (`id`,`categoria_id`),
  ADD KEY `fk_temas_categoria1_idx` (`categoria_id`);

--
-- Indices de la tabla `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`,`users_id`),
  ADD KEY `fk_tokens_users1_idx` (`users_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`user_type_id`,`status_id`,`genero_id`),
  ADD KEY `fk_users_user_type_idx` (`user_type_id`),
  ADD KEY `fk_users_status1_idx` (`status_id`),
  ADD KEY `fk_users_genero1_idx` (`genero_id`);

--
-- Indices de la tabla `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usos`
--
ALTER TABLE `usos`
  ADD PRIMARY KEY (`id`,`estudiantes_id`),
  ADD KEY `fk_usos_estudiantes1_idx` (`estudiantes_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acceso`
--
ALTER TABLE `acceso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;
--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `ejemplos`
--
ALTER TABLE `ejemplos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT de la tabla `examen`
--
ALTER TABLE `examen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `leccion`
--
ALTER TABLE `leccion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT de la tabla `listening`
--
ALTER TABLE `listening`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `nota`
--
ALTER TABLE `nota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `notas_estudiantes`
--
ALTER TABLE `notas_estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `pronunciacion`
--
ALTER TABLE `pronunciacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tipo`
--
ALTER TABLE `tipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT de la tabla `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `usos`
--
ALTER TABLE `usos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `acceso`
--
ALTER TABLE `acceso`
  ADD CONSTRAINT `fk_acceso_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ejemplos`
--
ALTER TABLE `ejemplos`
  ADD CONSTRAINT `fk_ejemplos_temas1` FOREIGN KEY (`temas_id`) REFERENCES `temas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `fk_estudiantes_genero1` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_estudiantes_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `examen`
--
ALTER TABLE `examen`
  ADD CONSTRAINT `fk_examen_temas1` FOREIGN KEY (`temas_id`) REFERENCES `temas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_examen_tipo1` FOREIGN KEY (`tipo_id`) REFERENCES `tipo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `fk_item_examen1` FOREIGN KEY (`examen_id`) REFERENCES `examen` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `leccion`
--
ALTER TABLE `leccion`
  ADD CONSTRAINT `fk_leccion_temas1` FOREIGN KEY (`temas_id`) REFERENCES `temas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `listening`
--
ALTER TABLE `listening`
  ADD CONSTRAINT `fk_listening_temas1` FOREIGN KEY (`temas_id`) REFERENCES `temas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `notas_de_los_examenes`
--
ALTER TABLE `notas_de_los_examenes`
  ADD CONSTRAINT `fk_nota_has_examen_examen1` FOREIGN KEY (`examen_id`) REFERENCES `examen` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_nota_has_examen_nota1` FOREIGN KEY (`nota_id`) REFERENCES `nota` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `notas_estudiantes`
--
ALTER TABLE `notas_estudiantes`
  ADD CONSTRAINT `fk_estudiantes_has_nota_estudiantes1` FOREIGN KEY (`estudiantes_id`) REFERENCES `estudiantes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_estudiantes_has_nota_nota1` FOREIGN KEY (`nota_id`) REFERENCES `nota` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pronunciacion`
--
ALTER TABLE `pronunciacion`
  ADD CONSTRAINT `fk_pronunciacion_temas1` FOREIGN KEY (`temas_id`) REFERENCES `temas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `temas`
--
ALTER TABLE `temas`
  ADD CONSTRAINT `fk_temas_categoria1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `fk_tokens_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_genero1` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_user_type` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usos`
--
ALTER TABLE `usos`
  ADD CONSTRAINT `fk_usos_estudiantes1` FOREIGN KEY (`estudiantes_id`) REFERENCES `estudiantes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
