export type Booking = {
  id: number
  checkInDate: Date
  checkOutDate: Date
  numNights: number
  numGuests: number
  roomPrice: number
  extrasPrice: number
  totalPrice: number
  hasBreakfast: boolean
  isPaid: boolean
  observations: string
  status: string
  createdAt: Date
  guestEmail: string
  roomId: number
}

export type BookingWithRoom = Booking & {
  roomName: string
  roomImage: string
  roomSlug: string
  roomMaxCapacity: number
}
