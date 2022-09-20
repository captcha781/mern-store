import { useAppState } from "../../Store/hooks"
import { Link } from "react-router-dom"
import { useState } from "react"

const Navigation = () => {

  const state = useAppState(state => state.state)
  const [menuShow, setMenu] = useState<boolean>(false)

  return (
    <div className="w-full fixed text-white bg-black bg-opacity-10 shadow-sm [box-shadow:0 4px 30px rgba(0, 0, 0, 0.1)] backdrop-blur-lg border-b border-white ease-in duration-150" style={{height: menuShow?"fit-content":"auto"}}>
      <div className="w-full p-3 flex justify-between items-center">
        <Link to={"/"} className="font-fredoka text-lg text-white">Shopper</Link>
        <div className="hidden lg:flex font-outfit text-white  items-center space-x-4">
          {state.user?.type === "user" && <>
            <Link className="navLink" to={"/"}>Home</Link>
            <Link className="navLink" to={"/user/cart"} >Cart</Link>
            <Link className="navLink" to={"/user/orders"}>Orders</Link>
            <Link className="navLink" to={"signout"}>Signout</Link></>}
          {state.user?.type === "admin" && <>
            <Link className="navLink" to={"/"}>Home</Link>
            <Link className="navLink" to={"/admin/"}>Admin</Link>
            <Link className="navLink" to={"/admin/addproduct"}>Add Product</Link>
            <Link className="navLink" to={"/admin/stats"}>Stats</Link>
            <Link className="navLink" to={"signout"}>Signout</Link></>}
          {!state.auth && <>
            <Link className="navLink" to={"/"}>Home</Link>
            <Link className="navLink" to={"/signin"}>Signin</Link>
            <Link className="navLink" to={"/signup"}>Signup</Link>
          </>}
        </div>
        <div className="lg:hidden text-center flex justify-center items-center px-2 py-2 rounded-full bi bi-three-dots-vertical text-white hover:bg-white hover:bg-opacity-20" onClick={() => {
          setMenu(!menuShow)
        }}>
        </div>


      </div>
      {menuShow && <div className="flex flex-col font-outfit text-right space-y-2 py-5 mr-16 text-white" id="menudropdown" data-aos={"fade-down"}>
        {state.user?.type === "user" && <>
          <Link className="navLink" to={"/"}>Home</Link>
          <Link className="navLink" to={"/user/cart"} >Cart</Link>
          <Link className="navLink" to={"/user/orders"}>Orders</Link>
          <Link className="navLink" to={"signout"}>Signout</Link></>}
        {state.user?.type === "admin" && <>
          <Link className="navLink" to={"/"}>Home</Link>
          <Link className="navLink" to={"/admin/"}>Admin</Link>
          <Link className="navLink" to={"/admin/addproduct"}>Add Product</Link>
          <Link className="navLink" to={"/admin/stats"}>Stats</Link>
          <Link className="navLink" to={"signout"}>Signout</Link></>}
        {!state.auth && <>
          <Link className="navLink" to={"/"}>Home</Link>
          <Link className="navLink" to={"/signin"}>Signin</Link>
          <Link className="navLink" to={"/signup"}>Signup</Link>
        </>}
      </div>}
    </div>
  )
}

export default Navigation