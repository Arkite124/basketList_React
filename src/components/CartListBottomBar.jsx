import {useContext, useState} from "react";
import {LoginContext} from "../Provider/LoginProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dialog} from "@headlessui/react";

export default function CartListBottomNavBar(){
    const [loginUser]=useContext(LoginContext)
    const [bottomOpen,setBottomOpen]=useState(false)
    const [btnIcon,setBtnIcon]=useState(<FontAwesomeIcon icon="fa-solid fa-angle-up"/>)

    if(!loginUser) return(
        <div className="w-full h-full">
            <span onClick={()=>setBtnIcon(<FontAwesomeIcon icon="fa-solid fa-angle-down"/>)}>
                <button type="button" className="h-[3rem] w-[3rem] text-sky-500 text-lg" onClick={()=>{setBottomOpen(true)}}>{btnIcon}</button></span>
        <Dialog open={bottomOpen} Onclose={bottomOpen===false}>
            <div
                className="fixed inset-0 bg-black bg-opacity-40 w-full h-full"
                aria-hidden="true"
            >
        <div className="w-full flex flex-col justify-start z-20">
            <Dialog.Panel className="w-full h-[20rem]">
                <div className="flex flex-col w-full h-full justify-center items-center bg-amber-200 p-2">
                    <h2 className="font-bold text-blue-500 text-3xl font-mono">비로그인시 장바구니 리스트 없음!</h2>
                    <span onClick={()=>setBtnIcon(<FontAwesomeIcon icon="fa-solid fa-angle-up"/>)}>
                        <button type="button" className="h-[3rem] w-[3rem] text-sky-500 text-lg" onClick={()=>{setBottomOpen(false)}}>장바구니 접기</button></span>
                </div>
            </Dialog.Panel>
        </div>
            </div>
        </Dialog>
        </div>
    )
    return (
        <>
            <h1>바텀 navBar (평소엔 숨겨져 있다가 여기다 장바구니 리스트 간소화 및 삭제 버튼 및 totalPrice)</h1>
        </>
    )
}