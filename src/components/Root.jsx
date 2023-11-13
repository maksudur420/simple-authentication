import { Outlet } from "react-router-dom"
import Header from "./Header"

const Root = () => {
  return (
    <div className="w-4/5 mx-auto">
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Root
