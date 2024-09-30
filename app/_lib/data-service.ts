import { eachDayOfInterval } from 'date-fns'
import pool from '@/app/_lib/db'

// Types
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import type { Settings } from '@/types/settings'
import type { Room } from '@/types/room'
import type { Country } from '@/types/country'
import type { Guest } from '@/types/guest'
import type { Booking, BookingWithRoom } from '@/types/booking'

/**
 * Helper function to simulate a delay for testing purposes.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generic function to execute a database query with error handling.
 *
 * @param {string} query - The SQL query to execute.
 * @param {Array<any>} params - An array of parameters to be passed to the query.
 * @returns {Promise<RowDataPacket[]>} A promise that resolves to the query result.
 * @throws {Error} Throws an error if the database query fails.
 */
async function queryDatabase(query: string, params: any[] = []): Promise<RowDataPacket[]> {
  let connection
  try {
    connection = await pool.getConnection()
    const [rows] = await connection.query<RowDataPacket[]>(query, params)
    return rows
  } catch (error) {
    console.error('Database query error:', error)
    throw new Error('Failed to execute query. Please try again later.')
  } finally {
    if (connection) connection.release()
  }
}

/**
 * Fetches the application settings from the database.
 *
 * @returns {Promise<Settings>} A promise that resolves to the application settings.
 * @throws {Error} Throws an error if the database query fails.
 */
export async function getSettings(): Promise<Settings> {
  const rows = await queryDatabase('SELECT * FROM settings')
  return rows.at(0) as Settings
}

/**
 * Fetches all rooms from the database.
 *
 * @returns {Promise<Room[]>} A promise that resolves to an array of rooms.
 * @throws {Error} Throws an error if the database query fails.
 */
export async function getRooms(): Promise<Room[]> {
  const rows = await queryDatabase('SELECT * FROM rooms')
  await delay(2000) // For testing purposes
  return rows as Room[]
}

/**
 * Fetches a single room from the database by its slug.
 *
 * @param {string} slug - The slug of the room to fetch.
 * @returns {Promise<Room | null>} A promise that resolves to a Room object or null if not found.
 * @throws {Error} Throws an error if the database query fails.
 */
export async function getRoom(slug: string): Promise<Room | null> {
  const rows = await queryDatabase('SELECT * FROM rooms WHERE slug = ?', [slug])
  if (rows.length === 0) return null
  return rows[0] as Room
}

/**
 * Fetches all booked dates for a specific room.
 *
 * @param {number} roomId - The ID of the room to fetch booked dates for.
 * @returns {Promise<Date[]>} A promise that resolves to an array of booked dates.
 * @throws {Error} Throws an error if the database query fails or if bookings could not be loaded.
 */
export async function getBookedDates(roomId: number): Promise<Date[]> {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  const query = `
    SELECT checkInDate, checkOutDate
    FROM bookings
    WHERE roomId = ?
      AND (checkInDate >= ? OR status = 'checked-in')
  `

  try {
    const rows = await queryDatabase(query, [roomId, today.toISOString()])

    const bookedDates = rows.flatMap(({ checkInDate, checkOutDate }) =>
      eachDayOfInterval({
        start: new Date(checkInDate),
        end: new Date(checkOutDate),
      })
    )

    return bookedDates
  } catch (error) {
    console.error('Error fetching booked dates:', error)
    throw new Error('Bookings could not be loaded')
  }
}

/**
 * Fetches all countries from an external API.
 *
 * @returns {Promise<Country[]>} A promise that resolves to an array of countries.
 * @throws {Error} Throws an error if the API request fails or if countries could not be fetched.
 */
export async function getCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`${process.env.COUNTRIES_API}/all?fields=name,flag`)
    const countries: Country[] = await response.json()
    return countries
  } catch (error) {
    console.error('Error fetching countries:', error)
    throw new Error('An error occurred while fetching the countries')
  }
}

/**
 * Fetches a single guest from the database by its email.
 *
 * @param {string} email - The email of the guest to fetch.
 * @returns {Promise<Guest | null>} A promise that resolves to a Guest object or null if not found.
 * @throws {Error} Throws an error if the database query fails.
 */
export async function getGuest(email: string): Promise<Guest | null> {
  const rows = await queryDatabase('SELECT * FROM guests WHERE email = ?', [email])
  if (rows.length === 0) return null
  return rows[0] as Guest
}

/**
 * Creates a new guest in the database.
 *
 * @param {Omit<Guest, 'id' | 'createdAt'>} guestData - The data of the guest to be created.
 * @returns {Promise<Guest>} A promise that resolves to the created guest object.
 * @throws {Error} Throws an error if the database operation fails.
 */
export async function createGuest(guestData: Omit<Guest, 'id' | 'createdAt'>): Promise<Guest> {
  const { nationalId, nationality, fullName, email, countryFlag } = guestData

  const query = `
	  INSERT INTO guests (nationalId, nationality, fullName, email, countryFlag)
	  VALUES (?, ?, ?, ?, ?)
	`

  let connection
  try {
    connection = await pool.getConnection()
    const [result] = await connection.query<ResultSetHeader>(query, [
      nationalId,
      nationality,
      fullName,
      email,
      countryFlag,
    ])

    const [newGuest] = await connection.query<(Guest & RowDataPacket)[]>(
      'SELECT * FROM guests WHERE id = ?',
      [result.insertId]
    )

    if (!newGuest[0]) {
      throw new Error('Guest was created but could not be retrieved')
    }

    return newGuest[0]
  } catch (error) {
    console.error('Error creating guest:', error)
    throw new Error('Failed to create guest. Please try again later.')
  } finally {
    if (connection) connection.release()
  }
}

/**
 * Updates an existing guest in the database.
 *
 * @param {string} email - The email of the guest to update.
 * @param {Partial<Guest>} guestData - The updated data of the guest.
 * @returns {Promise<Guest>} A promise that resolves to the updated guest object.
 * @throws {Error} Throws an error if the database operation fails.
 */
export async function updateGuest(email: string, guestData: Partial<Guest>): Promise<Guest> {
  const { nationalId, nationality, fullName, countryFlag } = guestData

  const query = `
	  UPDATE guests
	  SET nationalId = COALESCE(?, nationalId),
		  nationality = COALESCE(?, nationality),
		  fullName = COALESCE(?, fullName),
		  countryFlag = COALESCE(?, countryFlag)
	  WHERE email = ?
	`

  let connection
  try {
    connection = await pool.getConnection()
    await connection.query<ResultSetHeader>(query, [
      nationalId,
      nationality,
      fullName,
      countryFlag,
      email,
    ])

    const [updatedGuest] = await connection.query<(Guest & RowDataPacket)[]>(
      'SELECT * FROM guests WHERE email = ?',
      [email]
    )

    if (!updatedGuest[0]) {
      throw new Error('Guest was updated but could not be retrieved')
    }

    return updatedGuest[0]
  } catch (error) {
    console.error('Error updating guest:', error)
    throw new Error('Failed to update guest. Please try again later.')
  } finally {
    if (connection) connection.release()
  }
}

/**
 * Fetches all bookings for a guest from the database using their email.
 *
 * @param {string} email - The email of the guest to fetch bookings for.
 * @returns {Promise<BookingWithRoom[]>} A promise that resolves to an array of BookingWithRoom objects.
 * @throws {Error} Throws an error if the database query fails.
 */
export async function getBookings(email: string): Promise<BookingWithRoom[]> {
  const query = `
	  SELECT b.*, r.name as roomName, r.image as roomImage, r.slug as roomSlug
	  FROM bookings b
	  JOIN guests g ON b.guestEmail = g.email
	  JOIN rooms r ON b.roomId = r.id
	  WHERE g.email = ?
	  ORDER BY b.checkInDate DESC
	`

  try {
    const rows = await queryDatabase(query, [email])
    return rows as BookingWithRoom[]
  } catch (error) {
    console.error('Error fetching guest bookings:', error)
    throw new Error('Failed to fetch guest bookings. Please try again later.')
  }
}

/**
 * Fetches a single booking from the database by its ID.
 *
 * @param {number} id - The ID of the booking to fetch.
 * @returns {Promise<BookingWithRoom | null>} A promise that resolves to a BookingWithRoom object or null if not found.
 * @throws {Error} Throws an error if the database query fails.
 */
export async function getBooking(id: number): Promise<BookingWithRoom | null> {
  const query = `
	  SELECT b.*, r.name as roomName, r.image as roomImage, r.slug as roomSlug, r.maxCapacity as roomMaxCapacity
	  FROM bookings b
	  JOIN rooms r ON b.roomId = r.id
	  WHERE b.id = ?
	`

  try {
    const rows = await queryDatabase(query, [id])
    if (rows.length === 0) return null
    return rows[0] as BookingWithRoom
  } catch (error) {
    console.error('Error fetching booking:', error)
    throw new Error('Failed to fetch booking. Please try again later.')
  }
}

export async function updateBooking(
  id: number,
  updateData: Partial<Booking>
): Promise<BookingWithRoom> {
  const query = `
	  UPDATE bookings
	  SET numGuests = COALESCE(?, numGuests),
		  observations = COALESCE(?, observations)
	  WHERE id = ?
	`

  let connection
  try {
    connection = await pool.getConnection()
    await connection.query<ResultSetHeader>(query, [
      updateData.numGuests,
      updateData.observations,
      id,
    ])

    const updatedBooking = await getBooking(id)
    if (!updatedBooking) {
      throw new Error('Booking was updated but could not be retrieved')
    }

    return updatedBooking
  } catch (error) {
    console.error('Error updating booking:', error)
    throw new Error('Failed to update booking DB. Please try again later.')
  } finally {
    if (connection) connection.release()
  }
}

/**
 * Deletes a booking from the database by its ID and guest email.
 *
 * @param {number} id - The ID of the booking to delete.
 * @param {string} guestEmail - The email of the guest associated with the booking.
 * @returns {Promise<void>} A promise that resolves when the booking is deleted.
 * @throws {Error} Throws an error if the database operation fails or the booking does not exist.
 */
export async function deleteBooking(id: number, guestEmail: string): Promise<void> {
  const query = `DELETE FROM bookings WHERE id = ? AND guestEmail = ?`

  let connection
  try {
    connection = await pool.getConnection()
    const [result] = await connection.query<ResultSetHeader>(query, [id, guestEmail])

    if (result.affectedRows === 0) {
      throw new Error(
        `Booking with ID ${id} does not exist or you do not have permission to delete it`
      )
    }
  } catch (error) {
    console.error('Error deleting booking:', error)
    throw new Error('Failed to delete booking. Please try again later.')
  } finally {
    if (connection) connection.release()
  }
}

/**
 * Adds a new booking to the database.
 *
 * @param {Partial<Booking>} bookingData - The data of the booking to be created.
 * @returns {Promise<BookingWithRoom>} A promise that resolves to the created booking object with room details.
 * @throws {Error} Throws an error if the database operation fails.
 */
export async function addBooking(bookingData: Partial<Booking>): Promise<BookingWithRoom> {
  // Define required fields based on the table structure
  const requiredFields = [
    'checkInDate',
    'checkOutDate',
    'numNights',
    'numGuests',
    'roomPrice',
    'extrasPrice',
    'totalPrice',
    'hasBreakfast',
    'isPaid',
    'observations',
    'status',
    'guestEmail',
    'roomId',
  ] as const

  // Check if all required fields are present
  for (const field of requiredFields) {
    if (bookingData[field] === undefined) {
      throw new Error(`Missing required field: ${field}`)
    }
  }

  const {
    checkInDate,
    checkOutDate,
    numNights,
    numGuests,
    roomPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    isPaid,
    observations,
    status,
    guestEmail,
    roomId,
  } = bookingData

  const query = `
	  INSERT INTO bookings (
		checkInDate,
		checkOutDate,
		numNights,
		numGuests,
		roomPrice,
		extrasPrice,
		totalPrice,
		hasBreakfast,
		isPaid,
		observations,
		status,
		guestEmail,
		roomId
	  )
	  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

  let connection
  try {
    connection = await pool.getConnection()
    const [result] = await connection.query<ResultSetHeader>(query, [
      new Date(checkInDate!),
      new Date(checkOutDate!),
      Number(numNights),
      Number(numGuests),
      Number(roomPrice),
      Number(extrasPrice),
      Number(totalPrice),
      Boolean(hasBreakfast),
      Boolean(isPaid),
      observations || '',
      status,
      guestEmail,
      Number(roomId),
    ])

    const newBookingId = result.insertId
    const newBooking = await getBooking(newBookingId)

    if (!newBooking) {
      throw new Error('Booking was created but could not be retrieved')
    }

    return newBooking
  } catch (error) {
    console.error('Error creating booking:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to create booking: ${error.message}`)
    } else {
      throw new Error('Failed to create booking. Please try again later.')
    }
  } finally {
    if (connection) connection.release()
  }
}
