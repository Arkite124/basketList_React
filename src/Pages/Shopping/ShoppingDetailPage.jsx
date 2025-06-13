import React, {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../Provider/LoginProvider.jsx";
import {useModalContext} from "../../Provider/ModalProvider.jsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {InsertCart} from "../CartItemList/cartUtil/CartUtil.js";

export default function ShoppingDetailPage(){
    const productName=useParams()
    const [loginUser]=useContext(LoginContext)
    const {openModal,closeModal}=useModalContext()
    const modalTitle="수량 제한"
    const modalMaximumContent=(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-red-500/70 text-3xl font-mono mb-5">제한 수량을 초과하였습니다.</span>
        <span><button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-600 text-white text-xl font-mono hover:bg-red-400 hover:text-black"
                      onClick={closeModal}>돌아가기</button></span>
    </div>)
    const modalMinimumContent=(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-red-500/70 text-3xl font-mono mb-5">수량은 1미만이 될 수 없습니다.</span>
        <span><button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-600 text-white text-xl font-mono hover:bg-red-400 hover:text-black"
                      onClick={closeModal}>돌아가기</button></span>
    </div>)

    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const{data:product,isLoading,error}=useQuery({
        queryKey:["product"],
        queryFn:async ()=>{
            const res=await axios.get(`http://localhost:8000/api/product/list/detail?productName=${productName}`)
            return res.data
        },
        staleTime:60000,
        cacheTime:90000,
        retry : 1,
    })
    const [quantity,setQuantity]=useState(1)
    const handlePlus = () => { //10개 이상 됬을때 modal이 호출되도록 함
        if (quantity >= 10) {
            openModal(modalTitle,modalMaximumContent);
            return;
        }
        setQuantity(quantity+ 1);
    };
    const handleMinus = () => { //1개 미만이 될수 없도록 함
        if (quantity <= 1) {
            openModal(modalTitle, modalMinimumContent);
            return;
        }
        quantity(quantity- 1);
    };
    const checkTitle="장바구니 담김 확인"
    const addCartItem=()=>{
        try{
            InsertCart(quantity).then(res=>{
                res.status
                queryClient.invalidateQueries(["cartList"])
                return openModal(checkTitle, basketContent)
            }).catch(()=>openModal(checkTitle,alreadyExistsContent))
        }catch {openModal(checkTitle,ErrorContent)}
    }
    // 상세페이지에 쇼핑페이지에 있던 모달 내용을 그대로 띄울 예정
    const checkBasketContent=(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-blue-500/70 text-2xl font-mono mb-5">정말 장바구니에 담으시겠습니까?</span>
        <span className="flex flex-row justify-between w-[80%]">
            <button className="w-[40%] md:w-[7.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-red-400 hover:text-white"
                    onClick={closeModal}>돌아가기</button>
        <span onClick={closeModal}><button className="w-[40%] md:w-[7.5rem] h-[3rem] mr-3 rounded-lg bg-red-600 text-white text-xl font-mono hover:bg-red-400 hover:text-black"
                                           onClick={addCartItem}>담기</button></span></span>
    </div>)
    const basketContent=(<div className="flex flex-col items-center justify-center">
        <img src="/checked_icon.png" alt="성공!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-blue-500/70 text-2xl font-mono mb-5">장바구니에 담겼습니다.</span>
        <span>
        <button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-red-400 hover:text-white"
                onClick={closeModal}>돌아가기</button></span>
    </div>)
    const alreadyExistsContent=(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-red-500/70 text-3xl font-mono mb-5">이미 장바구니에 담긴 항목입니다.</span>
        <span><button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-600 text-white text-xl font-mono hover:bg-red-400 hover:text-black"
                      onClick={closeModal}>돌아가기</button></span>
    </div>)
    const ErrorContent=(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-red-500/70 text-3xl font-mono mb-5">오류가 발생했습니다.</span>
        <span><button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-600 text-white text-xl font-mono hover:bg-red-400 hover:text-black"
                      onClick={closeModal}>돌아가기</button></span>
    </div>)
    const FormatPrice=product.productPrice.toLocaleString('ko-KR')
    return(
        <>
            <h1>상품 상세정보!</h1>
        </>
    )
}