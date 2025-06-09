import {useNavigate, useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../Provider/LoginProvider.jsx";
import {useModalContext} from "../../Provider/ModalProvider.jsx";
import Loading from "../../components/Loading.jsx";
import {categoryClassName} from "../HomePage.jsx";

export default function ShoppingSearchResult(){
    const {keyword}=useParams();
    const [loginUser]=useContext(LoginContext)
    const {openModal,closeModal}=useModalContext()
    function InitializeSize(){
        const width=window.innerWidth
        if(width>850) return 8
        return 4
    }
    const modalTitle="수량 제한"
    const modalMaximumContent=(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-red-500/70 text-3xl font-mono mb-5">제한 수량을 초과하였습니다.</span>
        <span><button className="w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-600 text-white text-xl font-mono hover:bg-red-400 hover:text-black"
                      onClick={closeModal}>돌아가기</button></span>
    </div>)
    const modalMinimumContent=(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-red-500/70 text-3xl font-mono mb-5">수량은 1미만이 될 수 없습니다.</span>
        <span><button className="w-[40%] md:w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-600 text-white text-xl font-mono hover:bg-red-400 hover:text-black"
                      onClick={closeModal}>돌아가기</button></span>
    </div>)
    const queryClient=useQueryClient()
    const [size,setSize]=useState(InitializeSize)
    const [totalPage,setTotalPage]=useState(0)
    useEffect(() => {
        const sizeHandler=()=>{
            setSize(InitializeSize)
        }
        window.addEventListener('resize',sizeHandler);
        return ()=>removeEventListener('resize',sizeHandler)
    }, []);
    const [page,setPage]=useState(0)
    const{data:result,isLoading,error}=useQuery({
        queryKey:["searchResult"],
        queryFn:async ()=> {
            const res=await axios.get(`http://localhost:8000/api/product/list/result/${keyword}?page=${page}&size=${size}`)
           return res.data.content
        },
        staleTime:60000,
        cacheTime:90000,
        retry : 1,
    })
    const countTotal=() =>axios.get(`http://localhost:8000/api/product/list/result/total?keyword=${keyword}`)
        .then(res=>res.data)
    countTotal().then(
        data=>{
            const totalPage=Math.floor(data/size) //소수점 이하 내림, 정수만 남김
            setTotalPage(totalPage)
        }
    ).catch(e=>e)
    const [cartQuantity,setCartQuantity]=useState({});
    const handleChange = (productName,cartQuantity)=>{
        setCartQuantity(num=>({...num,[productName]:cartQuantity}))
    } //상품별로 수량을 달리하기위한 기본 상태 정의

    useEffect(() => {
        queryClient.invalidateQueries(["searchResult"])
    }, [page, queryClient, size]);
    return(
        <div className="flex flex-col items-center justify-center w-[100%] h-full">
            <h1 className="text-bold text-sky-300 text-2xl lg:text-3xl font-mono mt-3">검색 결과</h1>
            <div className="flex flex-col items-center justify-center my-3 w-full h-5">
                <span className="w-full h-full font-mono text-indigo-600 mx-2 text-sm lg:text-xl flex flex-row justify-center">
                    <span className="w-fit-content h-full font-mono text-orange-500 mx-2 text-sm lg:text-xl flex flex-no-wrap text-elipsis">
                        "{keyword}"</span>&nbsp;로 검색하신 검색 결과 입니다.</span>
            </div>
            <div className="w-[85%] h-[70%] flex flex-row flex-wrap justify-center">
                {isLoading && <Loading message={"상품 리스트"}/>}
                {error && <span className="font-extrabold text-red-500 text-3xl font-mono">오류가 있어 상품목록을 불러올 수 없습니다.</span>}
                {result && result.map(product=>{
                    const productName = product.productName;
                    const cartQty = cartQuantity[productName] ?? 1;
                    const handlePlus = () => { //10개 이상 됬을때 modal이 호출되도록 함
                        if (cartQty >= 10) {
                            openModal(modalTitle,modalMaximumContent);
                            return;
                        }
                        handleChange(productName, cartQty + 1);
                    };
                    const handleMinus = () => { //1개 미만이 될수 없도록 함
                        if (cartQty <= 1) {
                            openModal(modalTitle, modalMinimumContent);
                            return;
                        }
                        handleChange(productName, cartQty - 1);
                    };
                    const FormatPrice=product.productPrice.toLocaleString('ko-KR')
                    return (
                        <div key={product.productId} className={categoryClassName[product.productCategory]}>
                            <div className="flex flex-col justify-center items-center pt-10 h-[15rem]">
                                <img src={product.productImgUrl ? product.productImgUrl : null} alt={"이미지 없음"}
                                     className="max-h-[80%] max-w-[80%] h-[10rem] w-[70%] border-y-amber-50 my-3"/>
                                <div className="w-0.9 h-[50%] flex flex-col justify-center">
                                    <span className="text-xl font-mono font-semibold text-neutral-900 my-0.5">{product.productName}</span>
                                    <span className="text-xl font-mono font-semibold text-cyan-900 my-0.5">남은 갯수 : {product.productQuantity}</span>
                                    <span className="text-xl font-mono font-semibold text-purple-900 my-0.5">가격 : &#8361;{FormatPrice}</span>
                                    <span className="text-xl font-mono font-semibold text-indigo-900 my-0.5 whitespace-nowrap">판매자 : {product.users.userNickname}</span>
                                </div>
                                {loginUser && loginUser.role!=="SELLER" ?
                                    <div className="flex flex-col items-center justify-flex-end h-[15%] w-full">
                                        <div className="mt-3 mb-1 flex flex-row justify-center w-full">
                                            <span className="text-md text-extrabold font-mono w-[20%] flex items-center justify-center mr-1">수량 : </span>
                                            <span className="w-6 h-[90%] rounded-sm flex flex-row items-center justify-center text-blue-500 bg-gray-200 text-xl"
                                            ><button className="flex items-center justify-center" onClick={()=>handleMinus()}>-</button></span>
                                            <span className="text-md font-mono font-semibold text-violet-600 border w-1/6 flex justify-center h-[90%]">{cartQty}</span>
                                            <span className="w-6 h-[90%] rounded-sm flex flex-row items-center justify-center text-blue-500 bg-gray-200 text-md"
                                            ><button className="flex items-center justify-center" onClick={()=>handlePlus()}>+</button></span>
                                        </div>
                                        <div className="flex flex-row justify-between w-4/5 h-full">
                                        <span className="border-cyan-500 border-2 rounded-md bg-purple-300 hover:bg-cyan-500 hover:border-transparent
                                        hover:text-white font-mono w-[5rem] flex justify-center"><button type="button">담기</button></span>
                                            <span className="border-emerald-600 text-white border-2 rounded-md bg-purple-600 hover:bg-emerald-300 hover:border-transparent
                                        hover:text-black font-mono w-[5rem] flex justify-center"><button type="button">사기</button></span>
                                        </div>
                                    </div>: null
                                }
                            </div>
                        </div>
                    )}
                )}
            </div>
            <div className="w-full flex flex-row h-[10%] my-5 justify-center">
                {(page>0) && <button onClick={()=>setPage(0)} className="w-[10rem] h-full rounded-md text-bold text-md font-mono text-blue-500 bg-lime-400 mr-2">&lt;&lt;  처음으로 </button>}
                {(page>0) && <button onClick={()=>setPage(page-1)} className="w-[10rem] h-full rounded-md text-bold text-md font-mono text-blue-500 bg-lime-200 mr-1">&lt; 이전 페이지로</button>}
                <span className="text-md font-mono font-semibold text-blue-600 mx-1">{page+1} </span>
                {page<totalPage  && <button onClick={()=>setPage(page+1)} className="w-[10rem] h-full rounded-md text-extrabold text-md font-mono text-blue-600 bg-sky-200 ml-1">다음 페이지로 &gt;</button>}
                {page<totalPage  && <button onClick={()=>setPage(totalPage)} className="w-[11rem] h-full rounded-md text-extrabold text-md font-mono text-indigo-600 bg-sky-200 ml-2">마지막 페이지로 &gt;&gt;</button>}
            </div>
        </div>
    )
}