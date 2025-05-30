import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../Provider/LoginProvider.jsx";
import axios from "axios";
import {useModalContext} from "../Provider/ModalProvider.jsx";

export function TopNavBar() {
    const [loginUser,setLoginUser]=useContext(LoginContext)
    const {openModal,closeModal}=useModalContext()
    const navigate=useNavigate()
    const serverUrl="http://localhost:8000/api/userStatus/logout"
    const [content,setContent]=useState(InitializeCont)
    const modalTitle="로그아웃 확인"
    const modalContent=(<div className="flex flex-col items-center justify-center">
        <img src="/checked_icon.png" alt="성공!" className="w-[10rem] h-[10rem]"/>
        <span className="text-bold text-blue-500/70 text-2xl font-mono mb-5">로그아웃 하였습니다!</span>
        <span onClick={()=>navigate("/")}>
                        <button className="w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-red-400 hover:text-white"
                                onClick={closeModal}>홈으로</button></span>
    </div>)
    const LogOut=async (e) => {
        e.preventDefault()
        axios.post(serverUrl,{
        },{
            withCredentials:true
        }).then(
            res=>{
                setLoginUser(res.data)
                openModal(modalTitle,modalContent)
            }
        ).then(()=>navigate("/")).catch(
            ()=> {
                setLoginUser(null)

            }
        )
    }
    function InitializeCont(){
        const windowWidth=window.innerWidth
        if(windowWidth>850)return true
        return false
    }
    useEffect(() => {
        function sizeHandler() {
            setContent(InitializeCont)
        }
        addEventListener('resize',sizeHandler)
        return ()=>removeEventListener('resize',sizeHandler)
    }, []);


    return (
        <nav className="relative size-16">
            <div
                className="fixed flex flex-row inset-x-0 w-full h-[4rem] bg-pink-200 justify-between items-center shadow-pink700/30">
                <div className="flex p-[0.25rem] items-center">
                    <Link to="/" className="flex flex-row">
                        <p className="text-orange-600 text-3xl flex items-center font-mono"><FontAwesomeIcon icon="fa-solid fa-store" />Home</p></Link>
                </div>
        {content && <div className="flex flex-row fixed left-[25%] right-[25%] justify-center top-0 my-4">
                <h1 className=" font-bold text-red-600/70 text-3xl font-mono "><FontAwesomeIcon icon={['far', 'star']}/>
                    장바구니 담아보기에요!
                    </h1>
                    <div className="font-bold text-purple-600/70 text-3xl" ><FontAwesomeIcon icon="fa-solid fa-cart-arrow-down"/></div>
                </div>}
                {loginUser ?<div className="flex flex-row w-[17rem] h-[80%] items-center m-0 justify-end">
                        <img src={loginUser.profileImgUrl ? loginUser.profileImgUrl : "/Image/defaultUser.jpg"} alt={"user"}
                        className="w-[2rem]"/><p className="font-mono text-md">{loginUser.userNickname}님</p>
                        <button className="w-[5.5rem] h-[2.5rem] rounded-lg bg-sky-300 text-black/90 mr-2.5 text-sm hover:bg-sky-400 hover:text-white font-mono"
                        onClick={LogOut}>
                            로그아웃<FontAwesomeIcon icon="fa-solid fa-right-to-bracket"/></button>
                    </div>
                   : <div>
                    <Link to="/login">
                        <button className="w-[5.5rem] h-[2.5rem] rounded-lg bg-sky-300 text-black/90 mr-2.5 hover:bg-sky-400 hover:text-white font-mono">
                            <FontAwesomeIcon icon="fa-solid fa-right-to-bracket"/>로그인</button>
                    </Link>
                    <Link to="/register">
                        <button className="w-[5.5rem] h-[2.5rem] rounded-lg bg-blue-300 text-black mr-2.5 font-mono hover:bg-blue-400 hover:text-white">회원가입</button>
                    </Link>
                </div>}
            </div>
        </nav>
    )
}