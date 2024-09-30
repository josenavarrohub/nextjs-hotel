'use client'
import React, { useState, ReactNode } from 'react'

export default function ReadMore({
  children,
  maxCharCount = 300,
}: {
  children: ReactNode
  maxCharCount?: number
}) {
  const [isTruncated, setIsTruncated] = useState(true)
  const text = children ? children.toString() : ''
  const shouldTruncate = text.length > maxCharCount
  const resultString = isTruncated ? text.slice(0, maxCharCount) : text

  return (
    <>
      {resultString}
      {shouldTruncate && (
        <>
          {isTruncated && '...'}
          <button
            onClick={() => setIsTruncated((prev) => !prev)}
            className='ml-1 font-semibold text-secondary-700 hover:text-secondary-800'
          >
            {isTruncated ? 'Read More' : 'Show Less'}
          </button>
        </>
      )}
    </>
  )
}
