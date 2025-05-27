import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const LoginContext=createContext(null)

export const LoginProvider=({children})=>{
    const serverUrl="http://localhost:8000/api/userStatus/login/me"
    const [loginUser,setLoginUser]=useState(null)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(() => {
        axios.get(serverUrl,{
            withCredentials:true
        }).then(res=>{
            if(!res) throw new Error("로그아웃 되었습니다.")
            return res.data
        }).then(res=>{
            setLoginUser(res.data)
            console.log(res.data)
            setIsLoading(false)
            }
        ).catch( ()=>{
            setIsLoading(false)
        }).finally(
            ()=>setIsLoading(false)
        )
    }, []);
    return (
        <LoginContext.Provider value={[loginUser,setLoginUser,isLoading]}>
            {children}
        </LoginContext.Provider>
    )
}