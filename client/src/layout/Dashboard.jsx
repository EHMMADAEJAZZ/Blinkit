import { Outlet } from "react-router-dom"
import UserMenu from "../components/UserMenu"

const Dashboard = () => {
  return (
    <section className="w-full max-h-[80dvh] bg-white overflow-hidden overflow-y-scroll scrollbar-none">
        <div className="w-full py-2  min-h-[80dvh] bg-white  grid  lg:grid-cols-[250px,1fr]">
          {/* menu */}
          <div className="pl-4 overflow-hidden   border-r-2 border-r-gray-300 hidden lg:block">
            <UserMenu/>
          </div>
          {/* content */}
          <div className="max-h-[80dhv]  overflow-hidden overflow-y-scroll scrollbar-none ">

              <Outlet/>
          </div>
        </div>
    </section>
  )
}

export default Dashboard