import { PrismaClient } from '@prisma/client'
import RestaurantNavBar from '../../../components/RestaurantNavBar'
import Menu from './Menu'
interface Props {
  slug: string
}

const prisma = new PrismaClient()

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      items: true
    }
  })
  if (!restaurant) {
    throw new Error()
  }
  return restaurant.items
}

export default async function DescriptionPortion({ slug }: Props) {
  const menu = await fetchRestaurantMenu(slug)

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={slug} />
      <Menu menu={menu} />
    </div>
  )
}
