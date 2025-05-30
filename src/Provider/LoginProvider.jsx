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
            setIsLoading(false)
            setLoginUser(res.data)
            return res.data
        }).then(()=>{
            setIsLoading(false)
            }
        )
    }, []);
    return (
        <LoginContext.Provider value={[loginUser,setLoginUser,isLoading]}>
            {children}
        </LoginContext.Provider>
    )
}