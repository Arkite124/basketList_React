import {Link} from "react-router-dom";

export function TopNavBar() {
    return (
        <nav className="relative size-16">
            <div
                className="fixed flex flex-row inset-x-0 w-full h-[3.5rem] bg-pink-200 justify-between items-center shadow-pink700/30">
                <div className="flex p-[0.25rem] items-center">
                    <Link to="/" className="flex flex-row"><img src="/homeMark.png" alt="home" className= "w-[3rem] h-[3rem]"/>
                        <p className="text-orange-600 text-2xl flex items-center font-mono">Home</p></Link>
                </div>
                <div>
                    <Link to="/login" >
                        <button className="w-[5.5rem] h-[2.5rem] rounded-lg bg-gray-400 text-black mr-2.5">로그인</button>
                    </Link>
                    <Link to="/register">
                        <button className="w-[5.5rem] h-[2.5rem] rounded-lg bg-blue-400 text-white mr-2.5">회원가입</button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}