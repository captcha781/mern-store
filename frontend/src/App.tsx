import { useAppState } from "./Store/hooks"
import { Routes, Route, Navigate } from "react-router-dom"
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin";
import PageNotFound from "./Pages/PageNotFound";
import Orders from "./Pages/Orders";
import AddProduct from "./Pages/Admins/AddProduct";
import Stats from "./Pages/Admins/Stats";



function App() {

  const state = useAppState(state => state.state)

  return (
    <>
      {state.auth ?
        <Routes>
          {state.user?.type === "user" && <Route path="user">
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders/>} />
            <Route path="/*" element={<PageNotFound/>} />
          </Route>}
          {state.user?.type === "admin" && <Route path="admin">
            <Route index element={<Admin />} />
            <Route path="addproduct" element={<AddProduct/>}/>
            <Route path="stats" element={<Stats/>} />
            <Route path="/*" element={<PageNotFound/>} />
          </Route>}
          <Route path="/*" element={<PageNotFound/>} />
        </Routes> : <Navigate to={"/signin"} />
      }
    </>
  );
}

export default App;
