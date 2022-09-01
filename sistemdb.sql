-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01-Set-2022 às 15:59
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sysdb`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `classroom` varchar(250) NOT NULL,
  `classroomNick` varchar(20) NOT NULL,
  `year` int(1) NOT NULL,
  `period` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `class`
--

INSERT INTO `class` (`id`, `classroom`, `classroomNick`, `year`, `period`) VALUES
(1, 'INFORMATICA PARA INTERNET', 'EMIA', 3, 'INTEGRAL'),
(2, 'DESENVOLVIMENTO DE SISTEMAS', 'EMDS', 2, 'INTEGRAL'),
(14, 'DESENVOLVIMENTO DE SISTEMAS', 'EMDS', 2, 'INTEGRAL'),
(15, 'DESENVOLVIMENTO DE SISTEMAS', 'EMDS', 2, 'INTEGRAL'),
(16, 'DESENVOLVIMENTO DE SISTEMAS', 'EMDS', 2, 'INTEGRAL'),
(17, 'DESENVOLVIMENTO DE SISTEMAS', 'EMDS', 2, 'INTEGRAL'),
(18, 'DESENVOLVIMENTO DE SISTEMAS', 'EMDS', 2, 'INTEGRAL');

-- --------------------------------------------------------

--
-- Estrutura da tabela `materiascurso`
--

CREATE TABLE `materiascurso` (
  `id` int(11) NOT NULL,
  `codigo` int(11) NOT NULL,
  `materia` varchar(50) NOT NULL,
  `apelidoMateria` varchar(10) NOT NULL,
  `classe` int(200) NOT NULL,
  `qtdAulas` int(2) NOT NULL,
  `commun` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `materiascurso`
--

INSERT INTO `materiascurso` (`id`, `codigo`, `materia`, `apelidoMateria`, `classe`, `qtdAulas`, `commun`) VALUES
(1, 3, 'PROGRAMAÇÃO WEB II', 'PWII', 1, 4, 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `materiascurso`
--
ALTER TABLE `materiascurso`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_class` (`classe`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `materiascurso`
--
ALTER TABLE `materiascurso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `materiascurso`
--
ALTER TABLE `materiascurso`
  ADD CONSTRAINT `fk_class` FOREIGN KEY (`classe`) REFERENCES `class` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
