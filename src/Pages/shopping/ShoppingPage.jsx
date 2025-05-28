import {useQuery, useQueryClient} from "@tanstack/react-query";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Loading from "../../components/Loading.jsx";
import {categoryClassName} from "../HomePage.jsx";
import {LoginContext} from "../../Provider/LoginProvider.jsx";

export default function ShoppingPage(){
    const [loginUser]=useContext(LoginContext)
    function InitializeSize(){
        const width=window.innerWidth
        if(width>850) return 8
        return 4
    }
    const queryClient=useQueryClient()
    const [quantity,setQuantity]=useState(1)
    useEffect(() => {
        if(quantity<1)
            setQuantity(1)
    }, [quantity]);
    const [keyword,setKeyword]=useState("")
     const [size,setSize]=useState(InitializeSize)
    const navigate=useNavigate()
    useEffect(() => {
        const sizeHandler=()=>{
            setSize(InitializeSize)
        }
        window.addEventListener('resize',sizeHandler);
        return ()=>removeEventListener('resize',sizeHandler)
    }, []);
    const [page,setPage]=useState(0)
    const [category,setCategory]=useState("All")
    const{data:product,isLoading,error}=useQuery({
        queryKey:["product",category,page,size],
        queryFn:async ()=>{
        const res=await axios.get(`http://localhost:8000/api/product/list/${category}?page=${page}&size=${size}`)
        return res.data
        },
        staleTime:60000,
        cacheTime:90000,
        retry : 1,
    })

    useEffect(() => {
        queryClient.invalidateQueries(["product",category,page,size])
    }, [category]);
    return(
        <div className="flex flex-col items-center justify-center w-[100%] h-full ">
            <h1 className="text-bold text-sky-300 text-3xl font-mono mt-3">상품 목록 보는 페이지에요!</h1>
            <div className="flex flex-row items-center justify-center my-3 w-full h-5">
                <span className="w-0.1 h-full font-mono text-indigo-600 mx-3"> 이름 검색 </span>
            <input type="text" name="keyword" className="w-[50%] h-0.8 font-mono mr-3" value={keyword} onChange={(e)=>{setKeyword(e.target.value)}}/>
                <button onClick={()=>{navigate(`shopping/result/${keyword}`)}}
                className="border border-blue-200 w-[15%] h-0.8 rounded-lg bg-sky-200 text-bold text-blue-400 text-xl hover:bg-blue-700 hover:text-white">검색</button>
            </div>
            <div className="flex flex-row font-mono mx-3 w-0.9 items-center">
                <span className="text-indigo-600 text-xl w-0.4 mx-3">상품 옵션 보기</span>
                <select className="w-0.4 mr-3">
                    <option onClick={()=>setCategory("All")} className="mx-1 text-rose-600 text-md">전체</option>
                    <option onClick={()=>setCategory("Fresh")} className="mx-1 text-green-600 text-md">과일,채소류</option>
                    <option onClick={()=>setCategory("alcohols")} className="mx-1 text-amber-600 text-md">주류</option>
                    <option onClick={()=>setCategory("instantFood")} className="mx-1 text-fuchsia-600 text-md">즉석식품</option>
                    <option onClick={()=>setCategory("snacks")} className="mx-1 text-indigo-600 text-md">간식</option>
                    <option onClick={()=>setCategory("stationery")} className="mx-1 text-emerald-600 text-md">문구류</option>
                </select>
            </div>
            <div className="w-[80%] h-[70%] flex flex-row flex-wrap">
            {isLoading && <Loading message={"상품 리스트"}/>}
            {error && <span className="font-extrabold text-red-500 text-3xl font-mono">오류가 있어 상품목록을 불러올 수 없습니다.</span>}
            {product && product.content.map(product =>
                 (
                    <div key={product.productId} className={categoryClassName[product.productCategory]}>
                        <div className="flex flex-col justify-center items-center mt-20 h-[60%]">
                        <img src={product.productImgUrl ? product.productImgUrl : null} alt={"이미지 없음"}
                             className="max-h-[80%] max-w-[80%] h-[70%] w-[70%] border-y-amber-50 my-1"/>
                        <div className="w-0.9 h-[90%] flex flex-col justify-center">
                            <span className="text-xl font-mono font-semibold text-neutral-900 my-0.5">{product.productName}</span>
                            <span className="text-xl font-mono font-semibold text-cyan-900 my-0.5">남은 갯수 : {product.productQuantity}</span>
                            <span className="text-xl font-mono font-semibold text-purple-900 my-0.5">가격 : {product.productPrice}</span>
                            <span className="text-xl font-mono font-semibold text-indigo-900 my-0.5 whitespace-nowrap">판매자 : {product.users.userNickname}</span>
                        </div>
                        </div>
                        {loginUser ? <div className="mt-1 flex flex-row justify-between h-[20%] w-[]">
                            <span className="w-1 h-1 rounded-sm text-bold text-sm font-mono text-blue-500 bg-gray-200"
                            ><button onClick={()=>setQuantity(quantity-1)}>-</button></span>
                            <span className="text-md font-mono font-semibold text-violet-600 mx-1">{quantity}</span>
                            <span className="w-1 h-1 rounded-sm text-bold text-sm font-mono text-blue-500 bg-gray-200"
                            ><button onClick={()=>setQuantity(quantity+1)}>+</button></span>
                        </div> : null
                        }
                    </div>
                )
            )}
            </div>
            <div className="w-full flex flex-row h-[10%] my-5 justify-center">
            {(page>0) && <button onClick={()=>setPage(0)} className="w-[8%] h-full rounded-md text-bold text-md font-mono text-blue-500 bg-lime-400 mr-2">&lt; 처음으로 </button>}
            {(page>0) && <button onClick={()=>setPage(page-1)} className="w-[8%] h-full rounded-md text-bold text-md font-mono text-blue-500 bg-lime-200 mr-1">&lt; 이전 페이지로</button>}
                <span className="text-md font-mono font-semibold text-blue-600 mx-1">{page+1}페이지</span>
            {product  && <button onClick={()=>setPage(page+1)} className="w-[8%] h-full rounded-md text-extrabold text-md font-mono text-blue-600 bg-sky-200 ml-1">다음 페이지로 &gt;</button>}
            </div>
        </div>
    )
}