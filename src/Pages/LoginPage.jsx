import React, {useContext, useState} from "react";
import {LoginContext} from "../Provider/LoginProvider.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useModalContext} from "../Provider/ModalProvider.jsx";
import Loading from "../components/Loading.jsx";
import {useQueryClient} from "@tanstack/react-query";


export default function LoginPage(){
    const serverURL="http://localhost:8000/api/userStatus/login"
    const [loginUser,setLoginUser,isLoading]=useContext(LoginContext)
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const [user,setUser]=useState({userName:"",current_password:""})
    const {openModal,closeModal}=useModalContext();
    const [loadingUser,setLoadingUser]=useState(false)
    const inputHandler = (e) => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };
    const loginTitle=("로그인 성공")
    const loginContent=(<div className="flex flex-col items-center justify-center">
        <img src="/checked_icon.png" alt="성공!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-blue-500/70 text-2xl font-mono mb-5">로그인에 성공하였습니다!</span>
        <span onClick={()=>navigate("/")}>
                        <button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-red-400 hover:text-white"
                                onClick={closeModal}>홈으로</button></span>
    </div>)
    const wrongTitle="로그인 오류"
    const wrongContent=(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-red-500/70 text-3xl font-mono mb-5">아이디나 비밀번호가 틀렸습니다!</span>
        <span><button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-600 text-white text-xl font-mono hover:bg-red-400 hover:text-black"
                      onClick={closeModal}>돌아가기</button></span>
    </div>)
    const errorTitle=("서버 오류!")
    const errorContent=(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-red-500/70 text-2xl font-mono mb-5">알수 없는 오류가 발생하였습니다.</span>
        <span><button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-400/50 text-black text-xl font-mono hover:bg-red-400 hover:text-white"
                      onClick={closeModal}>돌아가기</button></span>
    </div>)
    const loginHandler = (e) =>{
        e.preventDefault()
        try {
                axios.post(serverURL,{
                userName:user.userName,
                password:user.current_password
            },{withCredentials:true}).then((response)=>{
                const userData=response.data
                    setLoginUser(userData)
                    console.log("로그인 성공")
                    queryClient.getQueriesData(["cartList"])
                    setLoadingUser(true)
                    setTimeout(()=>{openModal(loginTitle, loginContent)},500)}).catch(async ()=>{
                if(!loadingUser){
                    setTimeout(()=>{openModal(wrongTitle,wrongContent)},500)}
            })}catch{
            setTimeout(()=>{openModal(errorTitle,errorContent)},500)}
    }

    if(isLoading===true) return <Loading message={"로그인 창"}/>
    return(
    <div className="flex flex-col top-[4rem] absolute w-full items-center h-[75%]">
        <h2 className="text-3xl text-bold font-mono text-blue-900/40 mb-3">로그인 하기</h2>
        <form className="w-0.75 flex flex-col h-full">
            <label className="flex flex-row items-center w-full h-[10%] justify-center font-mono">
                <span className="flex items-center w-[15%] h-full"> ID :</span>
                <input type="text" name="userName" onChange={(e) => {
                    inputHandler(e)
                }}
                       className="border border-purple-300 focus:outline-none focus:border-purple-300 focus:ring-purple-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[82%] h-[60%] min-h-[40%] max-h-[80%] overflow-scroll"/>
            </label>
            <label className="flex items-center w-full h-[10%] font-mono">
                <span className="flex items-center w-[15%] h-full"> PW :</span><input type="password"
                  name="current_password"
                  onChange={(e) => {
                      inputHandler(e)
                  }}
                  className="border border-purple-300 focus:outline-none focus:border-purple-300 focus:ring-purple-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[82%] h-[60%] min-h-[40%] max-h-[80%] overflow-scroll flex-end"/>
            </label>
            <div className="flex flex-row justify-between">
                <span><button type="button"
                    className="w-[7.5rem] h-[3rem] mr-3 rounded-lg bg-amber-600 text-black text-xl font-mono hover:bg-amber-600/50 hover:text-white"
                    onClick={() => {
                        navigate("/register")
                    }}>
                    회원가입
                </button></span>
                <span><button
                    className="w-[7.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-sky-400 hover:text-white"
                    onClick={loginHandler}>
                    로그인
                </button></span>
            </div>
        </form>
    </div>
    )
}
