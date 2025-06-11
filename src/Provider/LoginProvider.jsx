import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useModalContext} from "./ModalProvider.jsx";
import {Link} from "react-router-dom";

export const LoginContext=createContext(null)

export const LoginProvider=({children})=>{
    const serverUrl="http://localhost:8000/api/userStatus/login/me"
    const [loginUser,setLoginUser]=useState(null)
    const [isLoading,setIsLoading]=useState(true)
    const {openModal,closeModal}=useModalContext()
    const modalTitle="로그인 만료 정보"
    const modalContent=(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-red-500/70 text-3xl font-mono mb-5">세션이 만료되거나 서버와의 연결이 끊겼습니다.</span>
        <span>
            <Link to={"/"} className="w-[40%] md:w-[7.5rem] h-[3rem] mr-3 rounded-lg bg-sky-600 text-white text-xl font-mono hover:bg-sky-400 hover:text-black"
                      onClick={closeModal}>홈으로</Link>
        </span>
    </div>)
    //로그아웃 됬을때 모달 띄워서 홈으로 유도하기 위함
    useEffect(() => {
        axios.get(serverUrl,{
            withCredentials:true
        }).then(res=>{
            if(!res) throw new Error("로그아웃 되었습니다.")
            setIsLoading(false)
            setLoginUser(res.data)
            return res.data
        }).then(()=>{
            setIsLoading(false)
            }
        ).catch(()=> {
            openModal(modalTitle, modalContent)
        })
    }, []);
    return (
        <LoginContext.Provider value={[loginUser,setLoginUser,isLoading]}>
            {children}
        </LoginContext.Provider>
    )
}