import DescriptionPortion from './components/DescriptionPortion'

export default function RestaurantMenu({ params }: { params: {slug:string} }) {
  return (
    <>
      <DescriptionPortion slug={params.slug}  />
    </>
  )
}
