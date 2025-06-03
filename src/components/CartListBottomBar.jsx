import {useContext, useState} from "react";
import {LoginContext} from "../Provider/LoginProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dialog} from "@headlessui/react";

export default function CartListBottomNavBar(){
    const [loginUser]=useContext(LoginContext)
    const [bottomOpen,setBottomOpen]=useState(false)
    const [btnIcon,setBtnIcon]=useState(<FontAwesomeIcon icon="fa-solid fa-angle-up"/>)

    if(!loginUser || loginUser.role==="SELLER") return(
        <div className="w-full h-full">
            <span onClick={()=>setBtnIcon(<FontAwesomeIcon icon="fa-solid fa-angle-down"/>)}>
                <button type="button" className="fixed inset-x-0 bottom-[0.5rem] h-[2rem] w-[5rem] bg-amber-200 hover:bg-amber-400 rounded-t-lg border-b-2 border-blue-400 text-sky-500 text-lg" onClick={()=>{setBottomOpen(true)}}>{btnIcon}</button></span>
            <span className="fixed w-full bottom-0 h-[0.5rem] rounded-tr-lg bg-amber-200"></span>
        <Dialog open={bottomOpen} onClose={()=>{setBottomOpen(false)
            setBtnIcon(<FontAwesomeIcon icon="fa-solid fa-angle-up"/>)}}>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 w-full h-full"
                aria-hidden="true"
            >
        <div className="absolute inset-x-0 bottom-0 w-full h-full flex flex-col justify-end z-20">
            <button type="button" className=" h-[2rem] w-[5rem] border-b-2 rounded-t-lg bg-amber-200 hover:bg-amber-400 border-blue-400 text-sky-500 text-lg ease-in-out" onClick={()=>{setBottomOpen(false)}}>{btnIcon}</button>
            <Dialog.Panel className="w-full h-[10rem]">
                <div className="flex flex-col w-full h-full justify-center items-center bg-amber-200 rounded-tr-lg p-2">
                    <h2 className="font-bold text-blue-500 text-3xl font-mono mb-1">비로그인시,역할이 판매자일시 장바구니 리스트 없음!</h2>
                    <span onClick={()=>setBtnIcon(<FontAwesomeIcon icon="fa-solid fa-angle-up"/>)}>
                        <button type="button" className="h-[3rem] w-[10rem] border-2 bg-teal-200 rounded-lg border-blue-400 text-sky-500 text-lg hover:bg-teal-600 hover:text-white hover:border-transparent" onClick={()=>{setBottomOpen(false)}}>장바구니 접기</button></span>
                </div>
            </Dialog.Panel>
        </div>
            </div>
        </Dialog>
        </div>
    )
    return (
        <div className="w-full h-full">
            <span onClick={()=>setBtnIcon(<FontAwesomeIcon icon="fa-solid fa-angle-down"/>)}>
                <button type="button" className="fixed inset-x-0 bottom-[0.5rem] h-[2rem] w-[5rem] bg-amber-200 rounded-t-lg text-sky-500 text-lg border-b-2 border-blue-400 z-1" onClick={()=>{setBottomOpen(true)}}>{btnIcon}</button></span>
            <span className="fixed w-full bottom-0 h-[0.5rem] rounded-tr-lg bg-amber-200"></span>
            <Dialog open={bottomOpen} onClose={()=>{setBottomOpen(false)
                setBtnIcon(<FontAwesomeIcon icon="fa-solid fa-angle-up"/>)}}>
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 w-full h-full transition delay-150 duration-300"
                    aria-hidden="true"
                >
                    <div className="absolute inset-x-0 bottom-0 w-full h-full flex flex-col justify-end z-20">
                        <button type="button" className=" h-[2rem] w-[5rem] border-b-2 rounded-t-lg bg-amber-200 border-blue-400 text-sky-500 text-lg" onClick={()=>{setBottomOpen(false)}}>{btnIcon}</button>
                        <Dialog.Panel className="w-full h-[20rem]">
                            <div className="flex flex-col w-full h-full justify-center items-center bg-amber-200 p-2">
                                <h2 className="font-bold text-blue-500 text-3xl font-mono mb-1">로그인한 유저 장바구니 테스트</h2>
                                <span onClick={()=>setBtnIcon(<FontAwesomeIcon icon="fa-solid fa-angle-up"/>)}>
                        <button type="button" className="h-[3rem] w-[10rem] border-2 rounded-lg border-blue-400 text-sky-500 text-lg" onClick={()=>{setBottomOpen(false)}}>장바구니 접기</button></span>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}