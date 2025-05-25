import {createContext, useEffect, useState} from "react";
import axios from "axios";

const LoginContext=createContext(null)

export const LoginProvider=({children})=>{
    const serverUrl="http://localhost:8000/api/userStatus/login"
    const [loginUser,setLoginUser]=useState(null)

    useEffect(() => {
        axios.post(
            serverUrl, {
                userName:userName,
                password:password
            }.credentials.include
        ).then()
    }, []);
}