import Header from './components/Header'
import SideBar from './components/SideBar'
import RestaurantCar from './components/RestaurantCar'
import { PRICE, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fetchRestarantsByCity = (city: string | undefined) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true
  }

  if (!city) return prisma.restaurant.findMany({ select })

  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase()
        }
      }
    },
    select
  })
}

const fetchLocation = async () => {
  return prisma.location.findMany()
}
const fetchCuisine = async () => {
  return prisma.cuisine.findMany()
}

export default async function Search({
  searchParams
}: {
  searchParams: { city?: string; cuisine?: string; price?: PRICE }
}) {
  const restaurant = await fetchRestarantsByCity(searchParams.city)
  const location = await fetchLocation()
  const cuisine = await fetchCuisine()
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start text-black">
        <SideBar location={location} cuisine={cuisine} />
        <div className="w-5/6">
          {restaurant.length ? (
            <>
              {restaurant.map(rest => (
                <RestaurantCar restaurant={rest} key={rest.id} />
              ))}
            </>
          ) : (
            <p>Sorry, we found no restaurants in this area.....</p>
          )}
        </div>
      </div>
    </>
  )
}
