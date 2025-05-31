import {Outlet} from "react-router-dom";
import {TopNavBar} from "../components/TopNavBar.jsx";
import CartListBottomNavBar from "../components/CartListBottomBar.jsx";
import SideBottomNavBar from "../components/SideBottomNavBar.jsx";

export default function HomeLayout(){
    return(
        <>
            <TopNavBar/>

            <Outlet/>

            <CartListBottomNavBar/>
            <SideBottomNavBar/>
        </>
    )
}