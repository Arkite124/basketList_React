import React, {useContext, useState} from "react";
import {LoginContext} from "../Provider/LoginProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dialog} from "@headlessui/react";
import {useModalContext} from "../Provider/ModalProvider.jsx";
import {useQuery} from "@tanstack/react-query";
import {GetCart} from "../Pages/CartItemList/cartUtil/CartUtil.js";
import Loading from "./Loading.jsx";
import {categoryClassName} from "../Pages/HomePage.jsx";

export default function CartListBottomNavBar(){
    const [loginUser]=useContext(LoginContext)
    const [bottomOpen,setBottomOpen]=useState(false)
    const [btnIcon,setBtnIcon]=useState(<FontAwesomeIcon icon="fa-solid fa-angle-up"/>)
    const {openModal,closeModal}=useModalContext()
    const checkDeleteTitle="삭제 확인" // modal 제목
    const checkDeleteOneContent=(<div className="flex flex-col items-center justify-center">
        <img src="/checked_icon.png" alt="성공!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-blue-500/70 text-2xl font-mono mb-5">성공적으로 삭제하였습니다!</span>
        <span>
            <button className="w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-red-400 hover:text-white"
                    onClick={closeModal}>돌아가기</button></span>
        </div>) //삭제 확인 modal 내용
    const {data:cartList, isLoading, error}=useQuery({
        queryKey:["cartList"],
        queryFn:async ()=>{
            const res=await GetCart()
            return res.data
        },
        staleTime:60000,
        cacheTime:90000,
        retry : 1,
        enabled : !!loginUser
    })

    const categoryClassText={
        "alcohols":"text-gray-700 m-1 p-1 h-[20%] w-[40%] md:h-[3.5rem] md:w-[20%]",
        "stationery":"text-rose-600 m-1 p-1 h-[20%] w-[40%] md:h-[3.5rem] md:w-[20%]",
        "snacks":"text-indigo-600 m-1 p-1 h-[20%] w-[40%] md:h-[3.5rem] md:w-[20%]",
        "instantFood":"text-fuchsia-600 m-1 p-1 h-[20%] w-[40%] md:h-[3.5rem] md:w-[20%]",
        "Fresh":"text-green-600 m-1 p-1 h-[20%] w-[40%] md:h-[3.5rem] md:w-[20%]"
    }
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
            <Dialog.Panel className="w-full h-[8rem]">
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
                                <h2 className="font-bold text-blue-500 text-3xl font-mono mb-1">장바구니 목록</h2>
                                <div className="h-[10%] md:h-[2rem] w-full flex flex-row my-1 justify-center items-center">
                                    <span className="w-[10%] h-[10%] md:w-[7%] md:h-[1.5rem] m-1 p-1 text-rose-700 text-sm md:text-md">사진</span>
                                    <span className="text-rose-700 m-1 p-1 h-[10%] w-[40%] md:h-[1.5rem] md:w-[20%] text-sm md:text-md">상품 이름</span>
                                    <span className="text-rose-700 m-1 p-1 h-[10%] w-[40%] md:h-[1.5rem] md:w-[20%] text-sm md:text-md">상품 가격</span>
                                    <span className="text-rose-700 m-1 p-1 h-[10%] w-[40%] md:h-[1.5rem] md:w-[20%] text-sm md:text-md">수량</span>
                                    <span className="text-rose-700 m-1 p-1 h-[10%] w-[40%] md:h-[1.5rem] md:w-[20%] text-sm md:text-md">선택 가격</span>
                                </div>
                                <div className="flex flex-col h-full justify-center items-center w-full overflow-scroll">
                                    {isLoading && <Loading message={"장바구니"}/>}
                                    {error && <span className="font-extrabold text-red-500 text-3xl font-mono">오류발생으로 장바구니 목록을 불러올 수 없습니다.</span>}
                                    {cartList && cartList.map(list=> {
                                        const FormatPrice=list.products.productPrice.toLocaleString('ko-KR')
                                        const FormatSelectedPrice=list.selectedPrice.toLocaleString('ko-KR')
                                       return (<div className="h-full md:h-[30%] w-full flex flex-row justify-center items-center flex-pre-wrap">
                                            <img src={list.products.productImgUrl} alt={"상품사진"}
                                                 className="w-full h-[50%] md:w-[7%] md:h-full m-1"/>
                                            <span
                                                className={categoryClassText[list.products.productCategory]}>{list.products.productName}</span>
                                            <span className={categoryClassText[list.products.productCategory]}>&#8361;{FormatPrice}</span>
                                            <span className={categoryClassText[list.products.productCategory]}>{list.quantity}</span>

                                            <span className={categoryClassText[list.products.productCategory]}>&#8361;{FormatSelectedPrice}</span>
                                        </div>)})}
                                </div>
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