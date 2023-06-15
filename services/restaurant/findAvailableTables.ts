import { PrismaClient, Table } from "@prisma/client";
import { times } from "../../data";
import { NextApiResponse } from "next";

const prisma = new PrismaClient()

export const FindAvailableTables = async ({ time, day, res, restaurant }: {
  time: string;
  day: string;
  res: NextApiResponse;
  restaurant: {
    tables: Table[];
    open_time: string;
    close_time: string;
}
}) => {
  const searchTimes = times.find(t => {
    return t.time === time
  })?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({
      errorMessage: "Invalid data provider"
    })
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
      }

    },
    select: {
      number_of_peple: true,
      booking_time: true,
      tables: true
    }
  })

  const bookingTableObj: { [key: string]: { [key: number]: true } } = {};

  bookings.forEach(booking => {
    bookingTableObj[booking.booking_time.toISOString()] = booking.tables.reduce((obj, table) => {
      return {
        ...obj,
        [table.table_id]: true
      }
    }, {})
  })

 
  const tables = restaurant.tables

  const searchTimesWithTables = searchTimes.map(searchTime => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables
    }
  })

  searchTimesWithTables.forEach(t => {
    t.tables = t.tables.filter(table => {
      if (bookingTableObj[t.date.toISOString()]) {
        if (bookingTableObj[t.date.toISOString()][table.id]) return false
      }
      return true
    })
  })

  return searchTimesWithTables
}