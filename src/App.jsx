import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout.jsx";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/Register/RegisterPage.jsx";
import ShoppingPage from "./Pages/shopping/ShoppingPage.jsx";
import ShoppingDetailPage from "./Pages/shopping/ShoppingDetailPage.jsx";
import CartMainPage from "./Pages/CartItemList/CartMainPage.jsx";
import UserInfoPage from "./Pages/Users/UserInfoPage.jsx";
import UserDetailPage from "./Pages/Users/UserDetailPage.jsx";
import UserWishListPage from "./Pages/Users/UserWishListPage.jsx";
import {useContext} from "react";
import {LoginContext} from "./Provider/LoginProvider.jsx";
import {useModalContext} from "./Provider/ModalProvider.jsx";
import BigLoading from "./components/BigLoading.jsx";

function App() {
  const [isLoading]=useContext(LoginContext)
  const {modalReady}=useModalContext()
  if(isLoading || modalReady===false) return <BigLoading/>
  if(!isLoading && modalReady===true) return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout/>}>
        <Route path={"/"} element={<HomePage/>}/>
        <Route path={"/register"} element={<RegisterPage/>}/>
        <Route path={"/login"} element={<LoginPage/>}/>

          <Route path={"/shopping"}>
            <Route index element={<ShoppingPage/>}/>
            <Route path={":detail"} element={<ShoppingDetailPage/>}/>
          </Route>

          <Route path={"/cartList"}>
            <Route index element={<CartMainPage/>}/>
          </Route>

          <Route path={"/user"}>
            <Route index element={<UserInfoPage/>}/> {/*유저정보 간략 소개*/}
            <Route path={"detail"} element={<UserDetailPage/>}/>
            <Route path={"wishList"} element={<UserWishListPage/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
