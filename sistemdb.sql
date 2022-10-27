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
-- Estrutura da tabela `materiascurso`
--

CREATE TABLE `materiascurso` (
  `id` int(11) NOT NULL,
  `codigo` int(11) NOT NULL,
  `materia` varchar(200) NOT NULL,
  `apelidoMateria` varchar(10) NOT NULL,
  `classe` varchar(200) NOT NULL,
  `apelidoClasse` varchar(20) NOT NULL,
  `ano` int(1) NOT NULL,
  `qtdAulas` int(2) NOT NULL,
  `periodo` varchar(20) NOT NULL,
  `commun` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `materiascurso`
--
ALTER TABLE `materiascurso`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `materiascurso`
--
ALTER TABLE `materiascurso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
