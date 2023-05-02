import RestaurantNavBar from '../../../components/RestaurantNavBar'
import Menu from './Menu'
interface Props {
  slug: string
}

export default function DescriptionPortion({ slug }: Props) {
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={slug} />
      <Menu />
    </div>
  )
}
