import {useModalContext} from "../Provider/ModalProvider.jsx";
import '../index.css'
import {Link} from "react-router-dom";

export default function HomePage(){
   const {openModal}=useModalContext();
   const title="모달 제목"
   const content=(<p>나 불렀어?</p>)
    return(
        <div className="flex flex-col top-[4rem] absolute w-full items-center">
            <h1 className="text-xl font-bold text-red-700 text-7xl my-10 font-mono">장바구니 담아보기에요!</h1>
            <Link to={"/shopping"}><button type={"button"} className="border w-[40rem] h-[10rem]
            rounded-lg bg-pink-400/40 text-bold text-purple-500/70 text-6xl font-mono my-5">장보러 가기</button></Link>
            <button type={"button"} className="border w-[40rem] h-[10rem] rounded-lg
            bg-pink-400/40 text-purple-500/70 text-6xl font-mono my-10">구매 하기<br/>(추후 구현 예정)</button>
            <button onClick={()=>openModal(content,title)}
                    className="border w-[10rem] h-[2.5rem] rounded-lg bg-black text-white">모달 호출</button>
        </div>
    )
}