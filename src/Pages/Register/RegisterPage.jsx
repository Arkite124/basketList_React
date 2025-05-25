import {useState} from "react";
import {checkPwCorrect, checkUserNickname} from "./RegisterDuplicateCheck.js";
import {data} from "react-router-dom";

export default function RegisterPage(){
    const [userNickname,setUserNickname]=useState(null)
    const [password,setPassword]=useState(null)
    const [confirmPassword,setConfirmPassword]=useState(null)

    checkUserNickname({userNickname})
    checkPwCorrect({password,confirmPassword})

    return(
        <>
            <h1>이제 막 회원가입했어요!</h1>
        </>
    )
}