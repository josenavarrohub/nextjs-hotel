'use client'

import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { DateRange } from 'react-day-picker'

// Define the shape of our context
interface RoomReservationContextType {
  dates: DateRange | undefined
  setDates: Dispatch<SetStateAction<DateRange | undefined>>
  clearDates: () => void
}

// Create the context with a default value
const RoomReservationContext = createContext<RoomReservationContextType | undefined>(undefined)

// Provider component
export function RoomReservationProvider({ children }: { children: React.ReactNode }) {
  const [dates, setDates] = useState<DateRange | undefined>(undefined)
  const clearDates = () => setDates(undefined)

  return (
    <RoomReservationContext.Provider
      value={{
        dates,
        setDates,
        clearDates,
      }}
    >
      {children}
    </RoomReservationContext.Provider>
  )
}

// Custom hook
export function useRoomReservation(): RoomReservationContextType {
  const context = useContext(RoomReservationContext)
  if (context === undefined) {
    throw new Error('useRoomReservation must be used within a RoomReservationProvider')
  }
  return context
}
