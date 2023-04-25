import NavBar from '../../components/NavBar'
import DescriptionPortion from '../components/DescriptionPortion'
import Header from '../components/Header'

export default function RestaurantDetails() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen text-black">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <Header />
        <DescriptionPortion />
      </main>
    </main>
  )
}
