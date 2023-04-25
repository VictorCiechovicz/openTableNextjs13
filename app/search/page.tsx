
import NavBar from '../components/NavBar'
import Header from './components/Header'
import SideBar from './components/SideBar'
import RestaurantCar from './components/RestaurantCar'

export default function Search() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen text-black">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <Header />
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          <SideBar />
          <div className="w-5/6">
            <RestaurantCar />
          </div>
        </div>
      </main>
    </main>
  )
}
