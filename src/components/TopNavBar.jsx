import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function TopNavBar() {
    return (
        <nav className="relative size-16">
            <div
                className="fixed flex flex-row inset-x-0 w-full h-[3.5rem] bg-pink-200 justify-between items-center shadow-pink700/30">
                <div className="flex p-[0.25rem] items-center">
                    <Link to="/" className="flex flex-row">
                        <p className="text-orange-600 text-3xl flex items-center font-mono"><FontAwesomeIcon icon="fa-solid fa-store" />Home</p></Link>
                </div>
                <div className="flex flex-row">
                <h1 className="font-bold text-red-600 text-3xl my-10 font-mono"><FontAwesomeIcon icon={['far', 'star']}/>
                    장바구니 담아보기에요!
                    </h1>
                    <div className="font-bold text-purple-600 text-3xl my-10"><FontAwesomeIcon icon="fa-solid fa-cart-arrow-down"/></div>
                </div>
                <div>
                    <Link to="/login">
                        <button className="w-[5.5rem] h-[2.5rem] rounded-lg bg-sky-300 text-black/90 mr-2.5 hover:bg-sky-400 hover:text-white font-mono">
                            <FontAwesomeIcon icon="fa-solid fa-right-to-bracket"/>로그인</button>
                    </Link>
                    <Link to="/register">
                        <button className="w-[5.5rem] h-[2.5rem] rounded-lg bg-blue-300 text-black mr-2.5 font-mono hover:bg-blue-400 hover:text-white">회원가입</button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}