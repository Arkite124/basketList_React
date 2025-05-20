import {Outlet} from "react-router-dom";

export default function HomeLayout(){
    return(
        <>
            {/*<TopNavBar/>*/}

            <Outlet/>

            {/*<BottomNavBar/>*/}
        </>
    )
}