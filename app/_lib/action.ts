'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Auth
import { auth, signIn, signOut } from '@/app/_lib/auth'

// Services
import {
  updateGuest,
  updateBooking as updateBookingInDB,
  deleteBooking as deleteBookingFromDB,
  addBooking as addBookingToDB,
  getBooking,
} from '@/app/_lib/data-service'

// Types
import { Booking } from '@/types/booking'

/**
 * Server action to sign in the user using Google authentication.
 * Redirects the user to the '/account' page upon successful sign-in.
 *
 * @async
 * @function signInAction
 * @returns {Promise<void>}
 */
export async function signInAction() {
  await signIn('google', { redirectTo: '/account/reservations' })
}

/**
 * Server action to sign out the user.
 * Redirects the user to the homepage ('/').
 *
 * @async
 * @function signOutAction
 * @returns {Promise<void>}
 */
export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}

/**
 * Server action to update the user's profile information.
 * Validates the session and the form data, then updates the guest's information.
 * Revalidates the cache and refreshes the profile page.
 *
 * @async
 * @function updateProfile
 * @param {FormData} formData - The form data containing the user's updated profile details.
 * @throws {Error} If the user is not logged in or if the National ID is invalid.
 * @returns {Promise<{success: boolean, guest: object}>} - Returns a success status and the updated guest details.
 */
export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user?.email) throw new Error('You must be logged in')

  const nationalId = String(formData.get('nationalId'))
  const [nationality, countryFlag] = String(formData.get('nationality')).split('%')

  if (!/^[A-Z0-9]{6,10}$/.test(String(nationalId))) throw new Error('Invalid National ID format')

  try {
    const updatedGuest = await updateGuest(session.user.email, {
      nationalId,
      nationality,
      countryFlag,
    })

    revalidatePath('/account/profile')

    return { success: true, guest: updatedGuest }
  } catch (error) {
    console.error('Error in updateProfile:', error)
    throw new Error('Failed to update profile. Please try again later.')
  }
}

/**
 * Server action to update a booking's details.
 * Validates the session and the booking information, then updates the booking.
 * Revalidates the reservations path and redirects to the reservations page.
 *
 * @async
 * @function updateBooking
 * @param {FormData} formData - The form data containing the updated booking details.
 * @throws {Error} If the user is not logged in, the booking is not found, or the user does not have permission.
 * @returns {Promise<void>}
 */
export async function updateBooking(formData: FormData) {
  const session = await auth()
  if (!session?.user?.email) throw new Error('You must be logged in')

  const id = Number(formData.get('id'))
  const numGuests = Number(formData.get('numGuests'))
  const observations = formData.get('observations')?.slice(0, 1000) as string
  const updateData: Partial<Booking> = { numGuests, observations }

  try {
    const currentBooking = await getBooking(id)
    if (!currentBooking || currentBooking.guestEmail !== session.user.email) {
      throw new Error('Booking not found or you do not have permission to update it')
    }
    await updateBookingInDB(id, updateData)
  } catch (error) {
    console.error('Error in updateBooking:', error)
    throw new Error('Failed to update booking SA. Please try again later.')
  }

  revalidatePath(`/account/reservations/edit/${id}`)
  revalidatePath('/account/reservations')
  redirect('/account/reservations')
}

/**
 * Server action to delete a booking.
 * Validates the session and deletes the booking if the user has permission.
 * Revalidates the reservations path.
 *
 * @async
 * @function deleteBooking
 * @param {number} id - The ID of the booking to delete.
 * @throws {Error} If the user is not logged in or does not have permission to delete the booking.
 * @returns {Promise<void>}
 */
export async function deleteBooking(id: number) {
  const session = await auth()
  if (!session?.user?.email) throw new Error('You must be logged in')

  try {
    await deleteBookingFromDB(id, session.user.email)
    revalidatePath('/account/reservations')
  } catch (error) {
    console.error('Error in deleteBooking:', error)
    throw new Error('Failed to delete booking. Please try again later.')
  }
}

/**
 * Server action to add a new booking.
 * Validates the session, combines booking data from different sources, and creates a new booking.
 * Revalidates the reservations path and redirects to the reservations page upon success.
 *
 * @async
 * @function addBooking
 * @param {Partial<Booking>} bookingData - Partial booking data.
 * @param {FormData} formData - Form data containing guests and observations.
 * @throws {Error} If the user is not logged in or if there's an error in creating the booking.
 * @returns {Promise<void>}
 */
export async function addBooking(bookingData: Partial<Booking>, formData: FormData) {
  const session = await auth()
  if (!session?.user?.email) throw new Error('You must be logged in to make a booking')

  const newBooking: Partial<Booking> = {
    ...bookingData,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations')?.slice(0, 1000) as string,
    extrasPrice: 0,
    totalPrice: bookingData.roomPrice,
    status: 'unconfirmed',
    guestEmail: session.user.email,
    isPaid: false,
    hasBreakfast: false,
  }

  try {
    await addBookingToDB(newBooking)
  } catch (error) {
    console.error('Error in addBooking:', error)
    throw new Error('Failed to create booking. Please try again later.')
  }

  revalidatePath('/rooms')
  revalidatePath('/account/reservations')
  redirect('/account/reservations')
}
