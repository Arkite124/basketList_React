import '../index.css'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import Loading from "../components/Loading.jsx";

export default function HomePage(){
   function RandomThree() {
      axios.get("http://localhost:8000/api/product/main").then(
            res=>{
                console.log(res.data)
               return res.data}
        )
    }
    const categoryClassName={
        "alcohols":"bg-amber-300 m-3 max-h-[20rem] min-h-[15rem] max-w-[15rem] min-w-[10rem] rounded-2xl",
        "stationery":"bg-emerald-300 m-3 max-h-[20rem] min-h-[15rem] max-w-[15rem] min-w-[10rem] rounded-2xl",
        "snacks":"bg-indigo-300 m-3 max-h-[20rem] min-h-[15rem] max-w-[15rem] min-w-[10rem] rounded-2xl",
        "instantFood":"bg-fuchsia-300 m-3 max-h-[20rem] min-h-[15rem] max-w-[15rem] min-w-[10rem] rounded-2xl",
        "Fresh":"bg-green-300 m-3 max-h-[20rem] min-h-[15rem] max-w-[15rem] min-w-[10rem] rounded-2xl"
    }
    const { data: product, isLoading } = useQuery({
        queryKey: ["product"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:8000/api/product/main");
            return res.data;
        },
        staleTime: 60000,
        cacheTime: 60000,
        retry: 1,
    });

    return(
        <div className="flex flex-col items-center justify-center">
            <h1 className=" font-bold text-emerald-500 text-3xl font-mono "><FontAwesomeIcon icon={['far', 'star']}/>
                장바구니 담아보기에요!
            </h1>
            <h2 className="text-bold text-blue-500/70 text-4xl font-mono mt-2">상품 미리보기</h2>
            {isLoading && <Loading/>}
            <div className="flex flex-row">
            {product && product.map(product => {
               return (
                <div className={categoryClassName[product.productCategory]}>
                <div className="border-0 flex flex-col items-center justify-center m-2 h-full">
                    <img src={product.productImgUrl ? product.productImgUrl : null} alt={"이미지 없음"}
                       className="max-h-[40%] max-w-40 border-y-amber-50 my-1"/>
                    <div className="w-full h-1/2 flex flex-col justify-center items-center">
                        <span className="text-xl font-mono font-semibold text-neutral-900 my-0.5">{product.productName}</span>
                        <span className="text-xl font-mono font-semibold text-cyan-900 my-0.5">남은 갯수 : {product.productQuantity}</span>
                        <span className="text-xl font-mono font-semibold text-indigo-900 my-0.5">판매자 : {product.users.userNickname}</span>
                    </div>
                </div>
                </div>
                )})}
            </div>
            <Link to={"/shopping"} className="flex justify-center"><button type={"button"} className="border w-[30rem] h-[7.5rem] max-w-[75%]
            rounded-lg bg-pink-400/40 text-bold text-purple-500/70 text-4xl font-mono mt-5">장보러 가기</button></Link>
            <button type={"button"} className="border w-[30rem] h-[7.5rem] rounded-lg max-w-[75%]
            bg-pink-400/40 text-purple-500/70 text-4xl font-mono my-5">담긴 상품 구매 하기<br/>(추후 구현 예정)</button>
        </div>
    )
}