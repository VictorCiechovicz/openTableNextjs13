'use client'

import { useEffect, useState } from 'react'
import useReservation from '../../../hooks/useReservation'
import { CircularProgress } from '@mui/material'

export default function Form({
  slug,
  date,
  partySize
}: {
  slug: string
  date: string
  partySize: string
}) {
  const [inputs, setInputs] = useState({
    bookerEmail: '',
    bookerPhone: '',
    bookerFirstName: '',
    bookerLastName: '',
    bookerOccasion: '',
    bookerRequest: ''
  })
  const [day, time] = date.split('T')
  const [disable, setDisable] = useState(true)

  const { error, loading, createReservation } = useReservation()

  const hendleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerEmail &&
      inputs.bookerPhone
    ) {
      return setDisable(false)
    }

    setDisable(true)
  }, [inputs])

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      time,
      day,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest
    })
  }

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px] ">
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4 bg-white"
        placeholder="First name"
        name="bookerFirstName"
        value={inputs.bookerFirstName}
        onChange={hendleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4 bg-white"
        placeholder="Last name"
        name="bookerLastName"
        value={inputs.bookerLastName}
        onChange={hendleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4 bg-white"
        placeholder="Phone number"
        name="bookerPhone"
        value={inputs.bookerPhone}
        onChange={hendleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4 bg-white"
        placeholder="Email"
        name="bookerEmail"
        value={inputs.bookerEmail}
        onChange={hendleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4 bg-white"
        placeholder="Occasion (optional)"
        name="bookerOccasion"
        value={inputs.bookerOccasion}
        onChange={hendleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4 bg-white"
        placeholder="Requests (optional)"
        name="bookerRequest"
        value={inputs.bookerRequest}
        onChange={hendleChangeInputs}
      />
      <button
        onClick={handleClick}
        disabled={disable || loading}
        className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          'Complete reservation'
        )}
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Standard text message rates may apply. You may
        opt out of receiving text messages at any time.
      </p>
    </div>
  )
}
