'use client'

import Image from 'next/image'
import errorMascot from '../../public/icons/error.png'

interface ErroProps {
  error: Error
}

export default function Error({ error }: ErroProps) {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorMascot} alt="error" className="w-56 mb-8" />
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl text-black font-bold">Well,this is embarrassing</h3>
        <p className="text-reg text-black font-bold">{error.message}</p>
        <p className="mt-6 text-sm text-black font-light">Error Code: 400</p>
      </div>
    </div>
  )
}
