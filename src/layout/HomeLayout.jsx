import {Outlet} from "react-router-dom";
import {TopNavBar} from "../components/TopNavBar.jsx";

export default function HomeLayout(){
    return(
        <>
            <TopNavBar/>

            <Outlet/>

            {/*<BottomNavBar/>*/}
        </>
    )
}