-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 22, 2023 at 01:07 AM
-- Server version: 8.0.35
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `remindr`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`webrequests`@`%` PROCEDURE `FindGroupsForUser` (IN `groupeId` INT)   BEGIN
SELECT appartenir.idGroupe
FROM appartenir NATURAL JOIN groupes
WHERE appartenir.idUser = groupeId
GROUP BY appartenir.idGroupe;
END$$

CREATE DEFINER=`webrequests`@`%` PROCEDURE `FindRemindersForGroup` (IN `groupeId` INT)   SELECT idReminder
FROM reminders
WHERE idGroupe = groupeId$$

CREATE DEFINER=`webrequests`@`%` PROCEDURE `FindUsersForGroup` (IN `groupeId` INT)   SELECT idUser
FROM appartenir
WHERE idGroupe = groupeId
GROUP BY idUser$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `appartenir`
--

CREATE TABLE `appartenir` (
  `idAppartenir` int NOT NULL,
  `idUser` int NOT NULL,
  `idGroupe` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `appartenir`
--

INSERT INTO `appartenir` (`idAppartenir`, `idUser`, `idGroupe`) VALUES
(1, 3, 1),
(2, 1, 2),
(3, 2, 2),
(4, 4, 1),
(5, 1, 1),
(6, 6, 1),
(8, 6, 2),
(9, 6, 6),
(10, 1, 8),
(11, 6, 9),
(12, 4, 9),
(13, 2, 9),
(15, 7, 9),
(16, 5, 9),
(17, 2, 9),
(18, 4, 9),
(19, 3, 9),
(23, 7, 10),
(24, 6, 10),
(25, 7, 11),
(26, 6, 11),
(27, 5, 11),
(28, 6, 12);

-- --------------------------------------------------------

--
-- Table structure for table `groupes`
--

CREATE TABLE `groupes` (
  `idGroupe` int NOT NULL,
  `nameGroupe` varchar(50) NOT NULL,
  `descriptionGroupe` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `idCreator` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `groupes`
--

INSERT INTO `groupes` (`idGroupe`, `nameGroupe`, `descriptionGroupe`, `idCreator`) VALUES
(1, 'LesGrosTarés', '', 3),
(2, 'GigaDevWeb', '', 1),
(6, 'azd', 'azd', 6),
(8, 'Groupe fantome', 'boo', 1),
(9, 'Antoine Team', 'the cure', 6),
(10, 'azd', 'azdzadzda', 7),
(11, 'The Cure', 'Le groupe', 7),
(12, 'azd', 'azdzad', 6);

--
-- Triggers `groupes`
--
DELIMITER $$
CREATE TRIGGER `AddCreatorToItsOwnGroup` AFTER INSERT ON `groupes` FOR EACH ROW INSERT INTO appartenir (appartenir.idUser, appartenir.idGroupe)
VALUES (NEW.idCreator, NEW.idGroupe)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

CREATE TABLE `reminders` (
  `idReminder` int NOT NULL,
  `idGroupe` int NOT NULL,
  `date` timestamp NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdByUser` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reminders`
--

INSERT INTO `reminders` (`idReminder`, `idGroupe`, `date`, `name`, `description`, `createdAt`, `createdByUser`) VALUES
(1, 1, '2023-12-19 16:08:44', 'Retirer les pates', 'Si on le fait pas ca risquerait de mal se passer je pense enfin apres seulement mon avis evidement sinon comment ca va vous ?', '2023-12-19 16:08:44', 6),
(2, 1, '2023-12-19 17:29:12', 'Racheter une maison', 'Racheter une maison car on a pas suivi le dernier rappel', '2023-12-19 16:29:12', 6),
(9, 9, '2000-11-08 19:00:00', 'azd', 'azddazdazdzazadazdzadadza\r\nazdzad\r\nzad', '2023-12-21 20:33:17', 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idUser` int NOT NULL,
  `nameUser` varchar(50) NOT NULL,
  `firstnameUser` varchar(50) NOT NULL,
  `pseudoUser` varchar(50) NOT NULL,
  `mailUser` varchar(50) NOT NULL,
  `passwdUser` varchar(50) NOT NULL,
  `CreationDateUser` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `nameUser`, `firstnameUser`, `pseudoUser`, `mailUser`, `passwdUser`, `CreationDateUser`) VALUES
(1, 'Chabanel', 'Antoine', 'Niro2899', 'antoinebaptistemozart2@gmail.com', 'azdazdazd', '2023-12-12 09:35:16'),
(2, 'Chabanel', 'Antoine', 'azddza', 'antoinebaptistemozart2@gmail.com', 'azdzdad', '2023-12-12 09:40:15'),
(3, 'Cheb', 'Antoine', 'azd', 'antoinebaptistemozart2@gmail.com', 'azd', '2023-12-12 09:46:20'),
(4, 'Chabanel', 'Antoine', 'azd', 'antoinebaptistemozart2@gmail.com', 'azddzad', '2023-12-12 10:00:53'),
(5, 'Adrien', 'Wyrwal', 'Recock', 'adrien@adrien.fr', 'adrien', '2023-12-15 08:03:32'),
(6, 'Le Chab', 'Antoine', 'Niro2899', 'antoine.chabanel42@gmail.com', 'antoine42', '2023-12-19 08:50:27'),
(7, 'Smith', 'Robert', 'bobarsmith', 'robert@thecure.fr', 'bobarn', '2023-12-21 20:54:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appartenir`
--
ALTER TABLE `appartenir`
  ADD PRIMARY KEY (`idAppartenir`),
  ADD KEY `FK_idUserAppartenir` (`idUser`),
  ADD KEY `FK_idGroupeAppartenir` (`idGroupe`);

--
-- Indexes for table `groupes`
--
ALTER TABLE `groupes`
  ADD PRIMARY KEY (`idGroupe`),
  ADD KEY `FK_idCreator` (`idCreator`);

--
-- Indexes for table `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`idReminder`),
  ADD KEY `FK_createdByUserReminders` (`createdByUser`),
  ADD KEY `FK_idGroupeReminders` (`idGroupe`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appartenir`
--
ALTER TABLE `appartenir`
  MODIFY `idAppartenir` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `groupes`
--
ALTER TABLE `groupes`
  MODIFY `idGroupe` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `idReminder` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appartenir`
--
ALTER TABLE `appartenir`
  ADD CONSTRAINT `FK_idGroupeAppartenir` FOREIGN KEY (`idGroupe`) REFERENCES `groupes` (`idGroupe`),
  ADD CONSTRAINT `FK_idUserAppartenir` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Constraints for table `groupes`
--
ALTER TABLE `groupes`
  ADD CONSTRAINT `FK_idCreator` FOREIGN KEY (`idCreator`) REFERENCES `users` (`idUser`);

--
-- Constraints for table `reminders`
--
ALTER TABLE `reminders`
  ADD CONSTRAINT `FK_createdByUserReminders` FOREIGN KEY (`createdByUser`) REFERENCES `users` (`idUser`),
  ADD CONSTRAINT `FK_idGroupeReminders` FOREIGN KEY (`idGroupe`) REFERENCES `groupes` (`idGroupe`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
