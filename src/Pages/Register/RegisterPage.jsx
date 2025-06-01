import {useState} from "react";
import {
    CheckPwCorrect,
    CheckUserNickname
} from "./registerUtil/Register.js";

export default function RegisterPage(){
    const [user,setUser]=useState({
        userName:userName,
        password:password,
        profileImgUrl:profileImgUrl,
        userNickname:userNickname,
        selfIntroduction:selfIntroduction,
        role:role,
        email:email,
        phone:phone,
        privacyAgreements:privacyAgreements,
        marketingAgreements:marketingAgreements,
        createdAt:createdAt,
        birthDate:birthDate,
        name:name
    })
    const [userName,setUserName]=useState(null)
    const [userNickname,setUserNickname]=useState(null)
    const [password,setPassword]=useState(null)
    const [role,setRole]=useState("BUYER")
    const [profileImgUrl,setProfileImgUrl]=useState(null)
    const [selfIntroduction,setSelfIntroduction]=useState(null)
    const [email,setEmail]=useState(null)
    const [phone,setPhone]=useState(null)
    const [confirmPassword,setConfirmPassword]=useState(null)
    const [privacyAgreements,setPrivacyAgreements]=useState(false)
    const [marketingAgreements,setMarketingAgreements]=useState(false)
    const [birth,setBirth]=useState("")
    const [name,setName]=useState(null)
    const [birthDate,setBirthDate]=useState(Date.parse(birth))
    const createdAt=Date.now()
    const [passwordCheck,setPasswordCheck]=useState(false)
    const [nicknameCheck,setNicknameCheck]=useState(false)
    CheckUserNickname({userNickname})
    CheckPwCorrect({password,confirmPassword})
    const inputHandler = (e) => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };
    return(
        <>
            <h1>이제 막 회원가입했어요!</h1>
        </>
    )
}