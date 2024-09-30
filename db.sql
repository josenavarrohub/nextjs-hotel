SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(10) UNSIGNED NOT NULL,
  `checkInDate` datetime NOT NULL,
  `checkOutDate` datetime NOT NULL,
  `numNights` smallint(5) UNSIGNED NOT NULL,
  `numGuests` tinyint(3) UNSIGNED NOT NULL,
  `roomPrice` smallint(5) UNSIGNED NOT NULL,
  `extrasPrice` smallint(5) UNSIGNED NOT NULL,
  `totalPrice` smallint(5) UNSIGNED NOT NULL,
  `hasBreakfast` tinyint(1) NOT NULL,
  `isPaid` tinyint(1) NOT NULL,
  `observations` text NOT NULL,
  `status` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `guestEmail` varchar(255) NOT NULL,
  `roomId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `nationalId` varchar(50) NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `countryFlag` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guests`
--

INSERT INTO `guests` (`id`, `email`, `nationalId`, `nationality`, `fullName`, `countryFlag`, `createdAt`) VALUES
(1, 'hans.mueller@example.com', 'DE1234567890', 'Germany', 'Hans Müller', 'https://flagcdn.com/de.svg', '2024-09-04 16:45:00'),
(2, 'sarah.williams@example.com', 'GB0987654321', 'United Kingdom of Great Britain and Northern Ireland', 'Sarah Williams', 'https://flagcdn.com/gb.svg', '2024-09-04 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `maxCapacity` tinyint(3) UNSIGNED NOT NULL,
  `regularPrice` smallint(5) UNSIGNED NOT NULL,
  `discount` smallint(5) UNSIGNED DEFAULT 0,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `slug`, `name`, `description`, `maxCapacity`, `regularPrice`, `discount`, `image`, `createdAt`) VALUES
(1, 'luxury-suite', 'Luxury Suite', 'Indulge in the epitome of opulence with our Luxury Suite. This spacious retreat features a lavish king-sized bed adorned with premium linens, a private balcony offering breathtaking cityscape views, and an elegant living area designed for ultimate relaxation.\n\nEnjoy a separate dining space, an extensive selection of high-end amenities, and personalised service to make your stay unforgettable.', 2, 300, 50, '/rooms/1.jpg', '2024-09-01 10:00:00'),
(2, 'deluxe-room', 'Deluxe Room', 'Experience comfort and style in our Deluxe Room, where sophistication meets convenience. This generously sized room includes a queen-sized bed with plush bedding, a cosy lounge area perfect for unwinding, and modern amenities that cater to your every need.\n\nThe contemporary design and serene ambiance make it an ideal choice for both business and leisure travellers.', 3, 250, 30, '/rooms/2.jpg', '2024-09-01 11:00:00'),
(3, 'executive-room', 'Executive Room', 'Designed with the discerning business traveller in mind, our Executive Room offers an elegant king-sized bed, a well-appointed work desk with high-speed internet access, and a comfortable seating area.\n\nThe room’s sophisticated decor and practical features provide a productive and relaxing environment, ensuring that you can work efficiently and rest comfortably.', 2, 280, 0, '/rooms/3.jpg', '2024-09-01 12:00:00'),
(4, 'presidential-suite', 'Presidential Suite', 'Step into unparalleled luxury with our Presidential Suite, the pinnacle of our accommodation offerings. This expansive suite boasts two beautifully appointed bedrooms, a dedicated dining area for entertaining guests, and a private jacuzzi for ultimate relaxation.\n\nThe suite’s exclusive features and elegant furnishings create a truly lavish experience for those who seek the finest in hospitality.', 4, 500, 50, '/rooms/4.jpg', '2024-09-01 13:00:00'),
(5, 'family-suite', 'Family Suite', 'Perfect for families or groups, our Family Suite offers ample space and comfort with two queen-sized beds, a convenient sofa bed, and a well-equipped kitchenette.\n\nThe suite’s thoughtfully designed layout ensures that everyone has their own space, while the cosy atmosphere and family-friendly amenities make it an ideal choice for longer stays and family vacations.', 4, 350, 0, '/rooms/5.jpg', '2024-09-01 14:00:00'),
(6, 'honeymoon-suite', 'Honeymoon Suite', 'Celebrate your special moments in our Honeymoon Suite, designed with romance in mind. This enchanting suite features a luxurious king-sized bed, a private jacuzzi for intimate moments, and a bottle of complimentary champagne to toast your love.\n\nThe suite’s elegant decor and serene setting create a perfect escape for couples seeking a memorable getaway.', 2, 320, 60, '/rooms/6.jpg', '2024-09-01 15:00:00'),
(7, 'standard-room', 'Standard Room', 'Our Standard Room offers a comfortable and practical space for solo travellers or short stays. Furnished with a cosy double bed and essential amenities, this room provides a welcoming retreat after a day of exploration or business activities.\n\nThe straightforward design and value-for-money pricing make it a reliable choice for those seeking simplicity and comfort.', 2, 180, 20, '/rooms/7.jpg', '2024-09-01 16:00:00'),
(8, 'penthouse-suite', 'Penthouse Suite', 'Experience the height of luxury in our Penthouse Suite, featuring panoramic views of the city, a private terrace for al fresco dining, and a grand piano for a touch of sophistication.\n\nThis opulent suite offers expansive living spaces, high-end furnishings, and exceptional service, making it the ultimate choice for guests seeking a lavish and unforgettable stay.', 4, 600, 0, '/rooms/8.jpg', '2024-09-01 17:00:00'),
(9, 'royal-suite', 'Royal Suite', 'Our Royal Suite epitomises grandeur with its lavish decor, king-sized bed, and an exclusive private pool.\n\nThe suite also includes 24/7 butler service to cater to your every need, ensuring a seamless and indulgent stay. The luxurious design and exceptional amenities provide an unparalleled level of comfort and elegance, perfect for those who demand the very best.', 4, 800, 100, '/rooms/9.jpg', '2024-09-01 18:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `minBookingLength` smallint(5) UNSIGNED NOT NULL,
  `maxBookingLength` smallint(5) UNSIGNED NOT NULL,
  `maxGuestsPerBooking` tinyint(3) UNSIGNED NOT NULL,
  `breakfastPrice` smallint(5) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `minBookingLength`, `maxBookingLength`, `maxGuestsPerBooking`, `breakfastPrice`, `createdAt`) VALUES
(1, 1, 90, 8, 15, '2024-09-04 16:34:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_guestEmail` (`guestEmail`),
  ADD KEY `fk_roomId` (`roomId`);

--
-- Indexes for table `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`email`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_guestEmail` FOREIGN KEY (`guestEmail`) REFERENCES `guests` (`email`),
  ADD CONSTRAINT `fk_roomId` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
