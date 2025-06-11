import React, {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../Provider/LoginProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useModalContext} from "../../Provider/ModalProvider.jsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {DeleteCartOne, GetCart, TotalPrice, UpdateQuantity} from "./cartUtil/CartUtil.js";
import Loading from "../../components/Loading.jsx";

export default function CartMainPage(){
    const [loginUser]=useContext(LoginContext)
    const queryClient=useQueryClient();
    const {openModal,closeModal}=useModalContext()
    const {data:cartList, isLoading, error}=useQuery({
        queryKey:["cartListItem"],
        queryFn:async ()=>{
            const res=await GetCart()
            return res.data
        },
        staleTime:60000,
        cacheTime:90000,
        retry : 1,
        enabled : !!loginUser
    })
    // 상세 페이지에서 수량 조절 예정, 수량 조절 모달 제목 및 내용
    const modalTitle="수량 제한"
    const modalMaximumContent=(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-red-500/70 text-3xl font-mono mb-5">제한 수량을 초과하였습니다.</span>
        <span><button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-600 text-white text-xl font-mono hover:bg-red-400 hover:text-black"
                      onClick={closeModal}>돌아가기</button></span>
    </div>) //상세 페이지 수량 제한 초과 메시지
    const modalMinimumContent=(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-red-500/70 text-3xl font-mono mb-5">수량은 1미만이 될 수 없습니다.</span>
        <span><button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-600 text-white text-xl font-mono hover:bg-red-400 hover:text-black"
                      onClick={closeModal}>돌아가기</button></span>
    </div>) //상세 페이지 수량 제한 1미만 불가 메시지

    const [cartQuantity,setCartQuantity]=useState({});
    const handleChange = (cartItemId,cartQuantity)=>{
        setCartQuantity(num=>({...num,[cartItemId]:cartQuantity}))
    }//상품별로 수량을 달리하기위한 기본 상태 정의

    const [total,setTotal]=useState(0)
    //totalPrice를 가져오기 위한 useState
    const TotalPriceWon=total.toLocaleString('ko-KR')
    //세자리 수마다 쉼표를 찍기 위한 형식
    const categoryClassText={
        "alcohols":"text-gray-700 m-1 p-1 h-[20%] w-[30%] md:h-full md:w-[15%] text-sm md:text-md flex items-center justify-center",
        "stationery":"text-rose-600 m-1 p-1 h-[20%] w-[30%] md:h-full md:w-[15%] text-sm md:text-md flex items-center justify-center",
        "snacks":"text-indigo-600 m-1 p-1 h-[20%] w-[30%] md:h-full md:w-[15%] text-sm md:text-md flex items-center justify-center",
        "instantFood":"text-fuchsia-600 m-1 p-1 h-[30%] w-[40%] md:h-full md:w-[15%] text-sm md:text-md flex items-center justify-center",
        "Fresh":"text-green-600 m-1 p-1 h-[20%] w-[30%] md:h-full md:w-[15%] text-sm md:text-md flex items-center justify-center"
    }
    if(loginUser) return(
        <div className="flex flex-col items-center w-[95%] md:w-full h-full">
            <h1 className="font-bold text-emerald-500 text-lg md:text-3xl font-mono flex-pre-wrap text-center"><FontAwesomeIcon icon={['far', 'star']}/>
                장바구니 {window.innerWidth<800 ? <br/> : null} 세부 내역 및 수량 조정
            </h1>
            <table className="flex flex-col items-center justify-center w-full h-full border-none overflow-x-scroll md:overflow-hidden">
                <thead className="flex flex-row items-center justify-between w-full h-[10%] md:h-[4rem] overflow-scroll md:overflow-hidden">
                    <tr className="w-full h-full mx-1 items-center flex flex-row">
                        <th className="w-[10%] h-[10%] md:h-[1.5rem] m-1 p-1 text-rose-700 text-sm md:text-md flex justify-center">상품 이미지</th>
                        <th className="text-rose-700 m-1 p-1 h-[10%] w-[30%] md:h-[1.5rem] md:w-[15%] text-sm md:text-md flex justify-center">상품 이름</th>
                        <th className="text-rose-700 m-1 p-1 h-[10%] w-[30%] md:h-[1.5rem] md:w-[15%] text-sm md:text-md flex justify-center">상품 가격</th>
                        <th className="text-rose-700 m-1 p-1 h-[10%] w-[30%] md:h-[1.5rem] md:w-[15%] text-sm md:text-md flex justify-center">수량</th>
                        <th className="text-rose-700 m-1 p-1 h-[10%] w-[30%] md:h-[1.5rem] md:w-[15%] text-sm md:text-md flex justify-center">선택 가격</th>
                        <th className="text-rose-700 m-1 p-1 h-[10%] w-[30%] md:h-[1.5rem] md:w-[15%] text-sm md:text-md flex justify-center">추가 날짜</th>
                        <th className="text-rose-700 m-1 mr-[1%] p-1 h-[10%] w-[30%] md:h-[1.5rem] md:w-[15%] text-sm md:text-md flex justify-center">삭제여부</th>
                    </tr>
                </thead>
                <tbody className="flex flex-col h-[70%] md:h-[75%] justify-start items-center w-full overflow-scroll md:overflow-hidden">
                {isLoading && <Loading message={"장바구니"}/>}
                {error && <tr className="font-extrabold text-red-500 text-3xl font-mono"><td>오류발생으로 장바구니 목록을 불러올 수 없습니다.</td></tr>}
                {cartList && cartList.map(cartListItem=> {
                    const DeleteCartItem=()=>{
                            try{
                               DeleteCartOne(cartListItem.cartItemId).then(()=> {
                                        queryClient.invalidateQueries(["cartListItem"])
                                        queryClient.invalidateQueries(["cartList"])
                                        return openModal(checkDeleteTitle, checkDeleteOneContent)
                                    }).catch(()=>{
                                    openModal(checkDeleteTitle,ErrorDeleteOneContent)
                                })
                            }catch{
                                console.log("오류발생")
                            }
                    }
                    const checkDeleteTitle="삭제 확인" // modal 제목
                    const DeleteCheckOneContent=(<div className="flex flex-col items-center justify-center">
                        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
                        <span className="text-bold text-blue-500/70 text-2xl font-mono mb-5">정말 삭제하시겠습니까?</span>
                        <span className="flex flex-row justify-between">
            <button className="w-[40%] md:w-[7.5rem] h-[3rem] mx-2 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-sky-400 hover:text-black"
                    onClick={closeModal}>돌아가기</button>
       <span onClick={closeModal}><button className="w-[40%] md:w-[7.5rem] h-[3rem] mx-2 rounded-lg bg-red-200 text-black text-xl font-mono hover:bg-red-500 hover:text-white"
                                          onClick={DeleteCartItem}>삭제하기</button></span></span>
                    </div>) //삭제 재확인 modal 내용
                    const checkDeleteOneContent=(<div className="flex flex-col items-center justify-center">
                        <img src="/checked_icon.png" alt="성공!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
                        <span className="text-bold text-blue-500/70 text-2xl font-mono mb-5">성공적으로 삭제하였습니다!</span>
                        <span>
            <button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-sky-600 hover:text-white"
                    onClick={closeModal}>돌아가기</button></span>
                    </div>) //삭제 성공확인 modal 내용
                    const ErrorDeleteOneContent=(<div className="flex flex-col items-center justify-center">
                        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
                        <span className="text-bold text-blue-500/70 text-2xl font-mono mb-5">삭제중 오류가 발생하였습니다.</span>
                        <span>
            <button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-400/50 text-black text-xl font-mono hover:bg-red-400 hover:text-white"
                    onClick={closeModal}>돌아가기</button></span>
                    </div>) //삭제 실패확인 modal 내용
                    const cartItemId = cartListItem.cartItemId;
                    const cartQty = cartQuantity[cartItemId] ?? cartListItem.quantity;
                    const handlePlus = () => { //10개 이상 됬을때 modal이 호출되도록 함
                        if (cartQty >= 10) {
                            openModal(modalTitle,modalMaximumContent);
                            return;
                        }
                        handleChange(cartItemId, cartQty + 1);
                    };
                    const handleMinus = () => { //1개 미만이 될수 없도록 함
                        if (cartQty <= 1) {
                            openModal(modalTitle, modalMinimumContent);
                            return;
                        }
                        handleChange(cartItemId, cartQty - 1);
                    };
                    useEffect(() => {
                        TotalPrice().then(
                            res=> {
                                setTotal(res.data)}
                        )
                    }, [cartQty]);
                    UpdateQuantity(cartListItem.cartItemId,cartQty).then(
                        res=> {
                            res.status
                            queryClient.invalidateQueries(["cartList"])
                        }
                    )
                    const FormatPrice=cartListItem.products.productPrice.toLocaleString('ko-KR')
                    const FormatSelectedPrice=cartListItem.selectedPrice.toLocaleString('ko-KR')
                    return (<tr className="h-[25%] md:h-[7.5rem] w-full flex flex-row justify-center items-center flex-pre-wrap my-2" key={cartListItem.cartItemId}>
                        <td className="w-[30%] h-full md:w-[10%] m-1 mt-1">
                            <img src={cartListItem.products.productImgUrl} alt={"상품사진"} className="w-full h-[40%] md:h-full m-1 mt-2"/></td>
                        <td className={categoryClassText[cartListItem.products.productCategory]}>{cartListItem.products.productName}</td>
                        <td className={categoryClassText[cartListItem.products.productCategory]}>&#8361;{FormatPrice}</td>
                        <td className={categoryClassText[cartListItem.products.productCategory]}>
                            <p className={"w-4 md:w-6 h-[25%] md:h-[1.5rem] rounded-sm flex flex-row items-center justify-center text-blue-500 bg-gray-200 text-md"}> <button className="flex items-center justify-center" onClick={()=>handleMinus()}>-</button></p>
                        <p className="text-md font-mono font-semibold text-violet-600 border w-1/6 flex justify-center h-[25%] md:h-[1.5rem]">{cartQty}</p>
                        <p className="w-4 md:w-6 h-[25%] md:h-[1.5rem] rounded-sm flex flex-row items-center justify-center text-blue-500 bg-gray-200 text-md"
                        ><button className="flex items-center justify-center" onClick={()=>handlePlus()}>+</button></p></td>
                        <td className={categoryClassText[cartListItem.products.productCategory]}>&#8361;{FormatSelectedPrice}</td>
                        <td className={categoryClassText[cartListItem.products.productCategory]}>{cartListItem.addedAt}</td>
                        <td className="m-1 p-1 h-[10%] w-[40%] md:h-[1.5rem] md:w-[15%] flex justify-center items-center">
                        <button className="text-rose-700 bg-pink-300 border h-[10%] w-[50%] md:h-[1.5rem] md:w-[50%] border-rose-700 rounded-md md:rounded-lg text-sm md:text-md
                    flex justify-center hover:border-transparent hover:bg-rose-700 hover:text-pink-300" type="button" onClick={()=> {
                            openModal(checkDeleteTitle, DeleteCheckOneContent)
                        }}>삭제하기</button></td>
                    </tr>)})}
                </tbody>
                <tfoot>
                   <tr>
                      <td className="text-rose-700 h-[10%] w-full md:h-[1.5rem] flex flex-end justify-end text-md md:text-lg">총 가격 : &#8361;{TotalPriceWon}</td>
                   </tr>
                </tfoot>
            </table>
        </div>)
    if(!loginUser) return (
        <h2 className="text-bold text-blue-500/70 text-4xl font-mono mt-2">상품 미리보기</h2>
    )
}