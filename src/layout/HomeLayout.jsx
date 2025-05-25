import {Outlet} from "react-router-dom";
import {TopNavBar} from "./TopNavBar.jsx";

export default function HomeLayout(){
    return(
        <>
            <TopNavBar/>

            <Outlet/>

            {/*<BottomNavBar/>*/}
        </>
    )
}