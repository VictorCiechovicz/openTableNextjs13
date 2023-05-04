'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
  const [location, setlocation] = useState('')

  const route = useRouter()

  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px] bg-white text-black"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={e => setlocation(e.target.value)}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={() => {
          if (location === '') return
          route.push(`/search?city=${location}`)
        }}
      >
        Let's go
      </button>
    </div>
  )
}

//2cudY9Yuc2CqkwEw