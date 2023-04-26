
import Header from './components/Header'
import SideBar from './components/SideBar'
import RestaurantCar from './components/RestaurantCar'

export default function Search() {
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SideBar />
        <div className="w-5/6">
          <RestaurantCar />
        </div>
      </div>
    </>
  )
}
