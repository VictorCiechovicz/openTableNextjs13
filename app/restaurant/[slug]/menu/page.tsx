import NavBar from '../../../components/NavBar'
import Header from '../../components/Header'
import DescriptionPortion from './components/DescriptionPortion'

export default function RestaurantMenu() {
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
