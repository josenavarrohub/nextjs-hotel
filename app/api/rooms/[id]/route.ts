import { NextRequest, NextResponse } from 'next/server'
import pool from '@/app/_lib/db'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const connection = await pool.getConnection()
    const [rows] = await connection.query('SELECT * FROM rooms WHERE id = ?', [id])
    connection.release()
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json({ error: 'Error fetching rooms' }, { status: 500 })
  }
}
