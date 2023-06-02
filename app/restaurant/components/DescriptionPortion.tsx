'use client'

import RestaurantNavBar from '../components/RestaurantNavBar'
import Title from '../components/Title'
import Rating from '../components/Rating'
import Description from '../components/Description'
import Images from '../components/Images'
import Reviews from '../components/Reviews'
import { Review } from '@prisma/client'
import { partySize, times } from '../../../data/index'
import DatePicker from 'react-datepicker'
import { useState } from 'react'

interface Props {
  description: string
  title: string
  slug: string
  images: string[]
  reviews: Review[]
  openTime: string
  closeTime: string
}

export default function DescriptionPortion({
  description,
  title,
  slug,
  images,
  reviews,
  openTime,
  closeTime
}: Props) {
  const [selectDate, setSelectDate] = useState<Date | null>(new Date())

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      return setSelectDate(date)
    }
    return setSelectDate(null)
  }

  const filterTimeByRestaurantOpenWindow = () => {
    const timesWithinWindow: typeof times = []

    let isWithinWindow = false

    times.forEach(time => {
      if (time.time === openTime) {
        isWithinWindow = true
      }

      if (isWithinWindow) {
        timesWithinWindow.push(time)
      }

      if (time.time === closeTime) {
        isWithinWindow = false
      }
    })

    return timesWithinWindow
  }

  return (
    <>
      <div className="bg-white w-[100%] rounded p-6 shadow">
        <RestaurantNavBar slug={slug} />
        <Title title={title} />
        <Rating reviews={reviews} />
        <Description description={description} />
        <Images images={images} />
        <Reviews reviews={reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <div className="fixed w-[15%] bg-white rounded p-3 shadow">
          <div className="text-center border-b pb-2 font-bold">
            <h4 className="mr-7 text-lg">Make a Reservation</h4>
          </div>
          <div className="my-3 flex flex-col ">
            <label htmlFor="">Party size</label>
            <select name="" className="py-3 border-b font-light bg-white" id="">
              {partySize.map(party => (
                <option value={party.value}>{party.label}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between ">
            <div className="flex flex-col w-[48%] ">
              <label htmlFor="">Date</label>
              <DatePicker
                selected={selectDate}
                onChange={handleChangeDate}
                className="py-3 border-b font-light text-reg w-28"
                dateFormat="MMMM d"
                wrapperClassName="w-[48%]"
              />
            </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">Time</label>
              <select
                name=""
                id=""
                className="py-3 border-b font-light bg-white"
              >
                {filterTimeByRestaurantOpenWindow().map(time => (
                  <option value={time.time}>{time.displayTime}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
              Find a Time
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
