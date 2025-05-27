import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Loading({message}){
    return(
        <div className="my-[10rem] h-[30rem] w-[20rem] min-h-[5rem] max-h-[15rem] min-w-[5rem] max-w-[15rem] flex flex-col justify-center items-center">
            <div className="inset-0 rounded-full bg-gradient-to-r from-red-500
            via-yellow-400 via-green-400 via-blue-400 to-purple-500 animate-spin"></div>
            <div className="inset-1 rounded-full bg-purple-300/10"></div>
            <span className="text-2xl font-mono my-5 w-full">{message} 로딩중...</span>
        </div>
    )
}