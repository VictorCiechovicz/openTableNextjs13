import Header from './components/Header'
import SideBar from './components/SideBar'
import RestaurantCard from './components/RestaurantCard'
import { PRICE, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface SearchParams {
  city?: string
  cuisine?: string
  price?: PRICE
}

const fetchRestarantsByCity = (searchParams: SearchParams) => {
  const where: any = {}

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase()
      }
    }
    where.location = location
  }

  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase()
      }
    }
    where.cuisine = cuisine
  }

  if (searchParams.price) {
    const price = {
      equals: searchParams.price
    }
    where.price = price
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true
  }

  return prisma.restaurant.findMany({
    where,
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
  searchParams: SearchParams
}) {
  const restaurant = await fetchRestarantsByCity(searchParams)
  const location = await fetchLocation()
  const cuisine = await fetchCuisine()
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start text-black">
        <SideBar
          searchParams={searchParams}
          location={location}
          cuisine={cuisine}
        />
        <div className="w-5/6">
          {restaurant.length ? (
            <div>
              {restaurant.map(rest => (
                <RestaurantCard restaurant={rest} key={rest.id} />
              ))}
            </div>
          ) : (
            <div>
              <div>Sorry, we found no restaurants in this area.....</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
