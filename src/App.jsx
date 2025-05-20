import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout.jsx";
import HomePage from "./Pages/HomePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout/>}/>
        <Route path={"/"} element={<HomePage/>}/>
        <Route path={"/signup"} element={<SignupPage/>}/>
        <Route path={"/login"} element={<LoginPage/>}/>

          <Route path={"/shopping"}>
            <Route index element={<ShoppingMainPage/>}/>
            <Route path={":category"} element={<ShoppingCategoryPage/>}/>
          </Route>

          <Route path={"/cartList"}>
            <Route index element={<CartMainPage/>}/>
          </Route>

          <Route path={"/user"}>
            <Route index element={<UserInfoPage/>}/> {/*유저정보 간략 소개*/}
            <Route path={"detail"} element={<UserDetailPage/>}/>
            <Route path={"/wishList"} element={<UserWishListPage/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
