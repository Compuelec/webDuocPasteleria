-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 01-07-2023 a las 06:13:36
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pasteleria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adminPanel_detallepedido`
--

CREATE TABLE `adminPanel_detallepedido` (
  `id` int(11) NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL CHECK (`cantidad` >= 0),
  `valor` decimal(12,0) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `fecha_modificacion` datetime(6) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `adminPanel_detallepedido`
--

INSERT INTO `adminPanel_detallepedido` (`id`, `cantidad`, `valor`, `fecha_creacion`, `fecha_modificacion`, `pedido_id`, `producto_id`) VALUES
(1, 2, '10000', '2023-06-25 20:22:25.384113', '2023-06-25 20:22:25.384120', 2, 7),
(2, 1, '10000', '2023-06-25 20:22:25.385233', '2023-06-25 20:22:25.385239', 2, 12),
(3, 1, '10000', '2023-06-25 20:30:12.411482', '2023-06-25 20:30:12.411510', 3, 6),
(4, 1, '10000', '2023-06-25 20:30:12.413222', '2023-06-25 20:30:12.413250', 3, 13),
(5, 1, '10000', '2023-06-25 20:30:12.415765', '2023-06-25 20:30:12.415804', 3, 10),
(6, 1, '10000', '2023-06-25 20:39:49.889305', '2023-06-25 20:39:49.889330', 4, 9),
(7, 1, '10000', '2023-06-25 20:39:49.890766', '2023-06-25 20:39:49.890796', 4, 10),
(8, 1, '10000', '2023-06-26 00:13:51.726224', '2023-06-26 00:13:51.726235', 5, 6),
(9, 1, '10000', '2023-06-26 00:13:51.729378', '2023-06-26 00:13:51.729395', 5, 12),
(10, 1, '15000', '2023-06-26 14:16:51.458442', '2023-06-26 14:16:51.458521', 6, 6),
(11, 1, '12000', '2023-06-26 14:16:51.461213', '2023-06-26 14:16:51.461255', 6, 8),
(12, 1, '10000', '2023-06-26 14:16:51.464386', '2023-06-26 14:16:51.465068', 6, 9),
(13, 1, '10000', '2023-06-26 14:16:51.467866', '2023-06-26 14:16:51.467894', 6, 10),
(14, 1, '15000', '2023-06-26 22:50:39.774727', '2023-06-26 22:50:39.774791', 7, 6),
(15, 1, '12000', '2023-06-26 22:50:39.776112', '2023-06-26 22:50:39.776133', 7, 8),
(16, 1, '10000', '2023-06-26 22:56:08.419389', '2023-06-26 22:56:08.419402', 8, 7),
(17, 1, '10000', '2023-06-26 22:56:08.420495', '2023-06-26 22:56:08.420539', 8, 9),
(18, 1, '10000', '2023-06-26 22:56:08.423554', '2023-06-26 22:56:08.423587', 8, 13),
(19, 1, '15000', '2023-06-28 01:09:52.555808', '2023-06-28 01:09:52.555842', 9, 6),
(20, 1, '10000', '2023-06-28 01:09:52.561639', '2023-06-28 01:09:52.561670', 9, 7),
(21, 1, '10000', '2023-06-28 01:09:52.565615', '2023-06-28 01:09:52.565646', 9, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adminPanel_pedido`
--

CREATE TABLE `adminPanel_pedido` (
  `id` int(11) NOT NULL,
  `estado` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `fecha_modificacion` datetime(6) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `adminPanel_pedido`
--

INSERT INTO `adminPanel_pedido` (`id`, `estado`, `fecha_creacion`, `fecha_modificacion`, `usuario_id`) VALUES
(2, 'pendiente', '2023-06-25 20:22:25.382233', '2023-06-28 01:09:06.973011', 1),
(3, 'enviado', '2023-06-25 20:30:12.409113', '2023-06-26 18:29:15.939187', 1),
(4, 'enviado', '2023-06-25 20:39:49.885738', '2023-06-28 01:08:46.618372', 1),
(5, 'pagado', '2023-06-26 00:13:51.722757', '2023-06-26 18:29:32.413357', 1),
(6, 'pendiente', '2023-06-26 14:16:51.453500', '2023-06-26 14:16:51.453576', 1),
(7, 'cancelado', '2023-06-26 22:50:39.771333', '2023-06-26 22:57:24.251785', 1),
(8, 'pendiente', '2023-06-26 22:56:08.417459', '2023-06-26 22:56:08.417496', 1),
(9, 'pendiente', '2023-06-28 01:09:52.547809', '2023-06-28 01:09:52.547879', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adminPanel_producto`
--

CREATE TABLE `adminPanel_producto` (
  `id` int(11) NOT NULL,
  `codigo` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` longtext COLLATE utf8mb4_spanish_ci NOT NULL,
  `imagen` varchar(100) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `stock` int(10) UNSIGNED NOT NULL CHECK (`stock` >= 0),
  `valor` decimal(12,0) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `fecha_modificacion` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `adminPanel_producto`
--

INSERT INTO `adminPanel_producto` (`id`, `codigo`, `nombre`, `descripcion`, `imagen`, `stock`, `valor`, `fecha_creacion`, `fecha_modificacion`) VALUES
(6, 'Ku-01', 'Kuchen de nuez', 'Disfruta de nuestro tradicional kuchen con nueces y caramelo. Es perfecto para la hora del té, sin embargo también es una buena opción como postre.', 'productos/img/1-2-300x300_tJRYV33.jpg', 10, '15000', '2023-06-25 13:20:40.554606', '2023-06-25 23:56:34.625696'),
(7, 'ku-man-02', 'Kuchen de manzana', 'Disfruta de nuestro tradicional kuchen manzana. Es perfecto para la hora del té, sin embargo también es una buena opción como postre. Una preparación para compartir con toda la familia.', 'productos/img/2-1-300x300.jpg', 10, '10000', '2023-06-25 13:21:56.020120', '2023-06-26 00:10:53.217454'),
(8, 'ku-aran-03', 'Kuchen de arándanos y frambuesa', 'Disfruta de nuestro Kuchen de arándanos y frambuesa con miga, es una excelente eleccion para compartir con toda la familia.', 'productos/img/3-1-300x300_Xmc3pji.jpg', 8, '12000', '2023-06-25 13:22:57.898834', '2023-06-26 00:09:40.442352'),
(9, 'pie-04', 'Pie de maracuyá y merengue', 'Delicioso pie con crema de maracuyá y merengue.', 'productos/img/5-1-300x300.jpg', 10, '10000', '2023-06-25 13:23:52.512227', '2023-06-25 13:23:52.512253'),
(10, 'chees-05', 'Cheesecake de frambuesa', 'Suave y cremoso cheesecake de frutos rojos con frescos arándanos y con salsa de frambuesa.', 'productos/img/7-1-300x300.jpg', 10, '10000', '2023-06-25 13:25:25.526977', '2023-06-25 13:25:25.527162'),
(11, 'chees-mara-06', 'Cheesecake de maracuyá', 'Suave y cremoso cheesecake de maracuyá, el fruto de la pasión traído desde Centroamérica.', 'productos/img/8-1-300x300.jpg', 10, '10000', '2023-06-25 13:27:06.659772', '2023-06-25 13:27:06.659828'),
(12, 'apple-07', 'Apple Pie', 'Apple Pie relleno de frescas manzanas laminadas con salsa de vainilla y cubierta de miga Streusel.', 'productos/img/Apple-pie-2-300x300.jpg', 10, '10000', '2023-06-25 13:28:14.083011', '2023-06-25 13:28:14.083062'),
(13, 'chees-choc-08', 'Cheesecake de chocolate', 'Suave y cremoso cheesecake de chocolate.', 'productos/img/cheesecake_chocolate_1-300x300.jpg', 10, '10000', '2023-06-25 13:29:07.971731', '2023-06-25 13:29:07.971775');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adminPanel_usuario`
--

CREATE TABLE `adminPanel_usuario` (
  `id` int(11) NOT NULL,
  `_id` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(254) COLLATE utf8mb4_spanish_ci NOT NULL,
  `tipo` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `imagen` varchar(100) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `token` varchar(1000) COLLATE utf8mb4_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `fecha_modificacion` datetime(6) NOT NULL,
  `last_login` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `adminPanel_usuario`
--

INSERT INTO `adminPanel_usuario` (`id`, `_id`, `nombre`, `correo`, `tipo`, `imagen`, `token`, `password`, `fecha_creacion`, `fecha_modificacion`, `last_login`) VALUES
(1, '_e0682f41018b46f28de89de881acfaed', 'Admin', 'admin@example.com', 'admin', '', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwiX2lkIjoiX2UwNjgyZjQxMDE4YjQ2ZjI4ZGU4OWRlODgxYWNmYWVkIiwibm9tYnJlIjoiQWRtaW4iLCJjb3JyZW8iOiJhZG1pbkBleGFtcGxlLmNvbSIsInRpcG8iOiJhZG1pbiIsImltYWdlbiI6IiJ9.Om-3OCqljSQVAAJIbzKLX-oHw0NgNzifgGP8CWQjLj4', 'pbkdf2_sha256$180000$bwMoJNnH4q9G$jpY7iEsQuDKxFvfnnFrwM7krlYb5YLig+MRb8UrhJ2M=', '2023-06-17 05:26:34.089043', '2023-07-01 00:07:45.459976', '2023-06-17 05:26:34.084019'),

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add producto', 7, 'add_producto'),
(26, 'Can change producto', 7, 'change_producto'),
(27, 'Can delete producto', 7, 'delete_producto'),
(28, 'Can view producto', 7, 'view_producto'),
(29, 'Can add usuario', 8, 'add_usuario'),
(30, 'Can change usuario', 8, 'change_usuario'),
(31, 'Can delete usuario', 8, 'delete_usuario'),
(32, 'Can view usuario', 8, 'view_usuario'),
(33, 'Can add pedido', 9, 'add_pedido'),
(34, 'Can change pedido', 9, 'change_pedido'),
(35, 'Can delete pedido', 9, 'delete_pedido'),
(36, 'Can view pedido', 9, 'view_pedido'),
(37, 'Can add detalle pedido', 10, 'add_detallepedido'),
(38, 'Can change detalle pedido', 10, 'change_detallepedido'),
(39, 'Can delete detalle pedido', 10, 'delete_detallepedido'),
(40, 'Can view detalle pedido', 10, 'view_detallepedido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) COLLATE utf8mb4_spanish_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `first_name` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_spanish_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `object_repr` varchar(200) COLLATE utf8mb4_spanish_ci NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext COLLATE utf8mb4_spanish_ci NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(10, 'adminPanel', 'detallepedido'),
(9, 'adminPanel', 'pedido'),
(7, 'adminPanel', 'producto'),
(8, 'adminPanel', 'usuario'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL,
  `app` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2023-06-16 13:49:39.052796'),
(2, 'auth', '0001_initial', '2023-06-16 13:49:39.113573'),
(3, 'admin', '0001_initial', '2023-06-16 13:49:39.262373'),
(4, 'admin', '0002_logentry_remove_auto_add', '2023-06-16 13:49:39.295717'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2023-06-16 13:49:39.300654'),
(6, 'adminPanel', '0001_initial', '2023-06-16 13:49:39.345600'),
(7, 'contenttypes', '0002_remove_content_type_name', '2023-06-16 13:49:39.427294'),
(8, 'auth', '0002_alter_permission_name_max_length', '2023-06-16 13:49:39.449532'),
(9, 'auth', '0003_alter_user_email_max_length', '2023-06-16 13:49:39.460493'),
(10, 'auth', '0004_alter_user_username_opts', '2023-06-16 13:49:39.464899'),
(11, 'auth', '0005_alter_user_last_login_null', '2023-06-16 13:49:39.480360'),
(12, 'auth', '0006_require_contenttypes_0002', '2023-06-16 13:49:39.481425'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2023-06-16 13:49:39.486614'),
(14, 'auth', '0008_alter_user_username_max_length', '2023-06-16 13:49:39.496360'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2023-06-16 13:49:39.507651'),
(16, 'auth', '0010_alter_group_name_max_length', '2023-06-16 13:49:39.521889'),
(17, 'auth', '0011_update_proxy_permissions', '2023-06-16 13:49:39.530180'),
(18, 'sessions', '0001_initial', '2023-06-16 13:49:39.549503'),
(19, 'adminPanel', '0002_usuario_last_login', '2023-06-16 14:50:20.566455'),
(20, 'adminPanel', '0003_auto_20230617_0503', '2023-06-17 05:03:52.436408'),
(21, 'adminPanel', '0004_auto_20230622_1247', '2023-06-22 12:47:58.086319'),
(22, 'adminPanel', '0005_auto_20230625_2044', '2023-06-25 20:45:47.538544');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_spanish_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('98jgblv2rfyta860oxz2idjtjfdc9n2h', 'YjlkOTQzOWM2OTcwY2NmZWZhMDhkMGFjZTBmYmMzYTM2ZDg0NGQzNDp7Im5vbWJyZSI6IkFkbWluIiwidG9rZW4iOm51bGwsImNvcnJlbyI6ImFkbWluQGV4YW1wbGUuY29tIn0=', '2023-07-01 03:08:22.287134');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adminPanel_detallepedido`
--
ALTER TABLE `adminPanel_detallepedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adminPanel_detallepe_pedido_id_117524cc_fk_adminPane` (`pedido_id`),
  ADD KEY `adminPanel_detallepe_producto_id_5d0b3869_fk_adminPane` (`producto_id`);

--
-- Indices de la tabla `adminPanel_pedido`
--
ALTER TABLE `adminPanel_pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adminPanel_pedido_usuario_id_c07a491b_fk_adminPanel_usuario_id` (`usuario_id`);

--
-- Indices de la tabla `adminPanel_producto`
--
ALTER TABLE `adminPanel_producto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `adminPanel_usuario`
--
ALTER TABLE `adminPanel_usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `_id` (`_id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indices de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indices de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indices de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indices de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adminPanel_detallepedido`
--
ALTER TABLE `adminPanel_detallepedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `adminPanel_pedido`
--
ALTER TABLE `adminPanel_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `adminPanel_producto`
--
ALTER TABLE `adminPanel_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `adminPanel_usuario`
--
ALTER TABLE `adminPanel_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adminPanel_detallepedido`
--
ALTER TABLE `adminPanel_detallepedido`
  ADD CONSTRAINT `adminPanel_detallepe_pedido_id_117524cc_fk_adminPane` FOREIGN KEY (`pedido_id`) REFERENCES `adminPanel_pedido` (`id`),
  ADD CONSTRAINT `adminPanel_detallepe_producto_id_5d0b3869_fk_adminPane` FOREIGN KEY (`producto_id`) REFERENCES `adminPanel_producto` (`id`);

--
-- Filtros para la tabla `adminPanel_pedido`
--
ALTER TABLE `adminPanel_pedido`
  ADD CONSTRAINT `adminPanel_pedido_usuario_id_c07a491b_fk_adminPanel_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `adminPanel_usuario` (`id`);

--
-- Filtros para la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Filtros para la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Filtros para la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
