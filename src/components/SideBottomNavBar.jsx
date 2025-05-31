import {useContext, useState} from "react";
import {LoginContext} from "../Provider/LoginProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dialog} from "@headlessui/react";

export default function SideBottomNavBar(){
    const [loginUser]=useContext(LoginContext)
    const [sideOpen,setSideOpen]=useState(false)

    if(!loginUser) return null
    if(loginUser && sideOpen===false) return (
        <div className="fixed bottom-[3rem] right-[3rem] w-[3rem] h-[3rem] rounded-full bg-cyan-200">
            <button className="text-xl text-indigo-700 flex text-center w-full h-full" onClick={()=>{setSideOpen(true)}}><FontAwesomeIcon icon="fa-solid fa-bars"/></button>
        </div>
    )
    if(loginUser && sideOpen===true) return(
        <Dialog open={sideOpen} onClose={()=>setSideOpen(false)} className="z-20 hidden transition-all transition-discrete">
        <div className="fixed inset-0 bg-black bg-opacity-40 h-full w-full"
             aria-hidden="true">
            <div className="relative w-[40%]">
                <Dialog.Panel className="absolute inset-y-0 right-0 w-full h-[15%] flex flex-col items-center">
                    <div className="w-full flex flex-col justify-start bg-slate-50 h-full p-2">
                        <h2 className="w-full text-teal-300 text-md lg:text-2xl block text-ellipsis overflow-hidden h-full my-1 border-b-2  border-gray-200">오른쪽 사이드에 fixed 형태로 고정 후 클릭시 띄우고 고정</h2>
                    </div>
                    <div className="w-full flex flex-col justify-end bg-slate-50 h-[15%] p-2">
                        <button className="w-full text-emerald-500 text-md lg:text-2xl block text-ellipsis overflow-hidden p-2 h-full my-1 border-b-2 border-gray-200 rounded-lg"
                        onClick={()=>{setSideOpen(false)}}>돌아가기</button>
                    </div>
                </Dialog.Panel>
            </div>
        </div>
        </Dialog>
    )
}