import { PrismaClient } from '@prisma/client'
import DescriptionPortion from '../components/DescriptionPortion'

interface Restaurante {
  id: number
  name: string
  slug: string
  images: string[]
  description: string
}

const prisma = new PrismaClient()

const fetchRestaurantsBySlug = async (slug: string): Promise<Restaurante> => {
  const restaurants = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true
    }
  })

  if (!restaurants) {
    throw new Error()
  }

  return restaurants
}

export default async function RestaurantDetails({
  params
}: {
  params: { slug: string }
}) {
  const restaurant = await fetchRestaurantsBySlug(params.slug)

  return (
    <>
      <DescriptionPortion
        images={restaurant.images}
        slug={restaurant.slug}
        title={restaurant.name}
        description={restaurant.description}
      />
    </>
  )
}
