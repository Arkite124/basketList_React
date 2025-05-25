import {useModalContext} from "../Provider/ModalProvider.jsx";
import '../index.css'
import {Link, useNavigate} from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import {useState} from "react";

export default function HomePage(){
   const {openModal,closeModal}=useModalContext();
   const [locateLogin,setLocateLogin]=useState(false)
   const navigate=useNavigate();
   const title="로그인 정보 없음!"
   const content=(<div className="flex flex-col my-5 items-center">
        <span className="text-bold text-blue-500/70 text-3xl font-mono mb-5">로그인 하시겠습니까?</span>
        <div className="flex flex-row justify-between">
            <span><button className="w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-sky-400 hover:text-white"
                          onClick={closeModal}>돌아가기</button></span>
            <span onClick={()=>navigate("/login")}><button className="w-[12.5rem] h-[3rem] ml-3 rounded-lg bg-red-400/50 text-black text-xl font-mono hover:bg-red-400 hover:text-white"
                          onClick={closeModal}>로그인 하러 가기</button></span>
        </div>
    </div>)
    return(
        <div className="flex flex-col top-[4rem] absolute w-full items-center">
            <h2>상품 미리보기</h2>
            <Link to={"/shopping"}><button type={"button"} className="border w-[40rem] h-[10rem]
            rounded-lg bg-pink-400/40 text-bold text-purple-500/70 text-6xl font-mono mt-5">장보러 가기</button></Link>
            <button type={"button"} className="border w-[40rem] h-[10rem] rounded-lg
            bg-pink-400/40 text-purple-500/70 text-6xl font-mono my-5">담긴 상품 구매 하기<br/>(추후 구현 예정)</button>
            <button onClick={()=>openModal(title,content)}
                    className="border w-[10rem] h-[2.5rem] rounded-lg bg-black text-white">모달 호출</button>
        </div>
    )
}