import {useContext, useState} from "react";
import {LoginContext} from "../Provider/LoginProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dialog} from "@headlessui/react";

export default function SideBottomNavBar(){
    const [loginUser]=useContext(LoginContext)
    const [sideOpen,setSideOpen]=useState(false)

    if(!loginUser) return null
    if(loginUser && !sideOpen) return (
        <div className="fixed top-[90%] right-[2%] w-[3rem] h-[3rem] rounded-full bg-cyan-200">
            <button className="text-2xl text-indigo-700 flex text-center w-full h-full items-center justify-center" onClick={()=>{setSideOpen(true)}}>
                <FontAwesomeIcon icon="fa-solid fa-bars"/></button>
        </div>
    )
    if(loginUser && sideOpen) return(
        <Dialog open={sideOpen} onClose={()=>setSideOpen(false)} className="z-30">
        <div className="fixed inset-0 bg-black bg-opacity-40 h-full w-full"
             aria-hidden="true">
            <div className="absolute inset-y-0 right-0 w-[40%] bg-emerald-50 rounded-xl">
                <Dialog.Panel className="w-full h-full flex flex-col rounded-xl">
                    <div className="w-full bg-emerald-50 h-full flex-col rounded-tl-xl">
                        <span className="w-full block text-ellipsis overflow-hidden border-b-2 h-[6.5rem] pt-2 hover:bg-teal-500 hover:rounded-tl-xl">
                            <h2 className="group w-full text-teal-400 text-2xl lg:text-4xl h-full my-1 flex justify-center items-center hover:text-white">
                                <span className="text-blue-500 group-hover:text-white"><FontAwesomeIcon icon="fa-solid fa-circle-info" /></span>&nbsp;내 정보</h2>
                        </span>
            {loginUser.role!=="SELLER" && (<span className="w-full block text-ellipsis overflow-hidden border-b-2 h-[6.5rem] hover:bg-teal-500">
                            <h2 className="w-full text-teal-400 text-2xl lg:text-4xl h-full my-1 flex justify-center items-center hover:text-white">
                                <FontAwesomeIcon icon="fa-solid fa-cart-arrow-down" /> &nbsp;내 장바구니</h2>
                        </span>)}
            {loginUser.role!=="SELLER" && (  <span className="w-full block text-ellipsis overflow-hidden border-b-2 h-[6.5rem] hover:bg-teal-500">
                            <h2 className="group w-full text-teal-400 text-2xl lg:text-4xl h-full my-1 flex justify-center items-center hover:text-white">
                                <span className="text-yellow-300 group-hover:text-white"><FontAwesomeIcon icon="fa-regular fa-star" /></span> 내 위시리스트</h2>
                        </span>)}
            {loginUser.role!=="SELLER" && (<span className="w-full block text-ellipsis overflow-hidden border-b-2 h-[6.5rem] hover:bg-teal-500">
                            <h2 className="group w-full text-teal-400 text-2xl lg:text-4xl h-full my-1 flex justify-center items-center hover:text-white">
                                <span className="text-indigo-500 group-hover:text-white"><FontAwesomeIcon icon="fa-regular fa-credit-card" /></span>&nbsp;구매내역<br/>
                                &nbsp;(미구현)
                            </h2>
                        </span>)}
            {loginUser.role!=="BUYER" && (<span className="w-full block text-ellipsis overflow-hidden border-b-2 h-[6.5rem] hover:bg-teal-500">
                            <h2 className="group w-full text-teal-400 text-2xl lg:text-4xl h-full my-1 flex justify-center items-center hover:text-white">
                                <span className="text-indigo-500 group-hover:text-white"><FontAwesomeIcon icon="fa-solid fa-clipboard-check" /></span>&nbsp;판매상품
                            </h2>
                        </span>)}
            {loginUser.role!=="BUYER" && (<span className="w-full block text-ellipsis overflow-hidden border-b-2 h-[6.5rem] hover:bg-teal-500">
                            <h2 className="group w-full text-teal-400 text-2xl lg:text-4xl h-full my-1 flex justify-center items-center hover:text-white">
                                <span className="text-green-500 group-hover:text-white"><FontAwesomeIcon icon="fa-solid fa-check" /></span>&nbsp;판매내역<br/>
                                &nbsp;(미구현)
                            </h2>
                        </span>)}
                        <span className="w-full block text-ellipsis overflow-hidden border-b-2 h-[6.5rem] hover:bg-teal-500">
                            <h2 className="group w-full text-teal-400 text-2xl lg:text-4xl h-full my-1 flex justify-center items-center hover:text-white">
                                <span className="text-teal-800 group-hover:text-white"><FontAwesomeIcon icon="fa-solid fa-gear"/></span>&nbsp;설정
                            </h2>
                        </span>
                    </div>
                    <div className="bg-emerald-50 w-full flex flex-col justify-center bg-slate-50 h-[15%] items-center flex-col rounded-bl-xl border-t-2 border-gray-200">
                        <button className="w-[75%] h-[75%] text-emerald-500 text-2xl bg-sky-200 lg:text-4xl block text-ellipsis overflow-hidden mt-1 rounded-lg
                        hover:bg-emerald-700 hover:text-white"
                        onClick={()=>{setSideOpen(false)}}><FontAwesomeIcon icon="fa-solid fa-arrow-left" />&nbsp;돌아가기</button>
                    </div>
                </Dialog.Panel>
            </div>
        </div>
        </Dialog>
    )
}