import React, {useEffect, useState} from "react";
import {
    CheckEmail,
    CheckPhone, CheckPrivacyAgreements,
    CheckPwCorrect, CheckUserName,
    CheckUserNickname
} from "./SignupUtil/Signup.js";

export default function SignupPage(){
    const [confirmPassword,setConfirmPassword]=useState("")
    const [checkUserName,setCheckUserName]=useState({})
    const [checkPwC,setCheckPwC]=useState({}) //비밀번호 확인하는 변수랑 이름이 같으면 안됨 밑에 것들도 그래서 이름이 조금씩 다름 C=correct
    const [checkUserNicknameC,setCheckUserNicknameC]=useState({})
    const [checkEmailAdd,setCheckEmailAdd]=useState({"checkEmail":true,"mailMessage":"메일은 필수 입력사항이 아닙니다."})
    const [checkPhoneNum,setCheckPhoneNum]=useState({})
    const [checkPrivacyAgreementsC,setPrivacyAgreementsC]=useState({})
    const [user,setUser]=useState({
        userName:"",
        password:"",
        profileImgUrl:"",
        userNickname:"",
        selfIntroduction:"",
        role:"",
        email:"",
        phone:"",
        privacyAgreements:Boolean,
        marketingAgreements:Boolean,
        birthDate:"",
        name:""
    })
    // CheckUserNickname({userNickname})
    // CheckPwCorrect({password,confirmPassword})
    const inputHandler = (e) => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };
    const handleCheckId = async () =>{
        try {
            CheckUserName(user.userName).then(
                res=> {
                    setCheckUserName({"checkName": res.data.checkName, "nameMessage":res.data.nameMessage})
                });
        }catch (e){
            console.log(e.message)
        }
    }

    const handleCheckPw = () =>{
        try {
            CheckPwCorrect({"password":user.password,confirmPassword:confirmPassword}).then(
                res=> {
                    setCheckPwC({"checkPw": res.data.checkPw, "pwMessage":res.data.pwMessage})
                });
        }catch (e){
            console.log(e.message)
        }
    }
    const handleCheckNickname = async () =>{
        if(user.email==="" || user.email===null) return checkEmailAdd
        try {
            CheckUserNickname(user.userNickname).then(
                res=> {
                    setCheckUserNicknameC({"checkNick": res.data.checkNick, "nickMessage":res.data.nickMessage})
                });
        }catch (e){
            console.log(e.message)
        }
    }
    const handleCheckEmail = async () =>{
        try {
            CheckEmail(user.email).then(
                res=> {
                    setCheckEmailAdd({"checkEmail": res.data.checkEmail, "mailMessage":res.data.mailMessage})
                });
        }catch (e){
            console.log(e.message)
        }
    }
    const handleCheckPhone = async () =>{
        try {
            CheckPhone(user.phone).then(
                res=> {
                    setCheckPhoneNum({"checkPhone": res.data.checkPhone, "phoneMessage":res.data.phoneMessage})
                });
        }catch (e){
            console.log(e.message)
        }
    }
    const handleCheckPrivacyAgreements = async () =>{
        try {
            CheckPrivacyAgreements(user.privacyAgreements).then(
                res=> {
                    setPrivacyAgreementsC({"isAgree": res.data.isAgree, "agreeMessage":res.data.agreeMessage})
                });
        }catch (e){
            console.log(e.message)
        }
    }

    return(
        <div className="flex flex-col justify-center items-center md:w-full h-[120%]">
            <h2 className="text-3xl text-bold font-mono text-sky-600">회원가입 페이지</h2>
            <div className="flex flex-row justify-center items-center md:w-full h-[120%]">
            <span className="text-red-500">*</span> &nbsp;표시 되어 있는 항목들은 필수항목 입니다.
            </div>
            <form className="w-0.9 md:w-[50%] flex flex-col h-full my-2">
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full"><span className="text-red-500">*</span>&nbsp;아이디 :</span>
                    <input type="text" name="userName" value={user.userName} onChange={(e) => inputHandler(e)}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[55%] h-[20rem] md:h-full min-h-[40%] overflow-scroll" placeholder="아이디는 6자가 넘어야 합니다."/>
                    <button type="button"
                            className="w-[6.5rem] h-[2rem] ml-2 border border-slate-300 rounded-lg bg-slate-200 text-black text-sm md:text-md
                             font-mono hover:bg-slate-700 hover:text-white hover:border-transparent"
                            onClick={handleCheckId}>
                        중복확인
                    </button>
                </label>
                <div className="w-full flex justify-center">
                    {checkUserName && checkUserName.checkName===true ? <span className="text-sm md:text-md text-bold font-mono text-green-600 h-[1rem] ">{checkUserName.nameMessage}</span> : null}
                    {checkUserName && checkUserName.checkName===false ? <span className="text-sm md:text-md text-bold font-mono text-red-600 h-[1rem] ">{checkUserName.nameMessage}</span> : null}
                </div>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full"><span className="text-red-500">*</span>&nbsp;비밀번호 :</span>
                    <input type="password" name="password" value={user.password} onChange={(e) => {inputHandler(e)}}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[55%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"
                           placeholder="비밀번호는 8자가 넘어야 합니다."/>
                </label>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono" onChange={()=>handleCheckPw}>
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full"><span className="text-red-500">*</span>&nbsp;비밀번호 확인 :</span>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => {
                        setConfirmPassword(e.target.value)}}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[55%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"
                    placeholder="비밀번호와 일치해야 합니다."/>
                </label>
                <div className="w-full flex justify-center">
                    {user.password!=="" && confirmPassword !=="" && checkPwC.checkPw===true ? <span className="text-sm md:text-md text-bold font-mono text-green-600 h-[1rem] ">{checkPwC.pwMessage}</span> : null}
                    {user.password!=="" && confirmPassword !=="" && checkPwC.checkPw===false ? <span className="text-sm md:text-md text-bold font-mono text-red-600 h-[1rem] ">{checkPwC.pwMessage}</span> : null}
                </div>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full"><span className="text-red-500">*</span>&nbsp; 닉네임 :</span>
                    <input type="text" name="userNickname" value={user.userNickname} onChange={(e) => inputHandler(e)}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[55%] h-[20rem] md:h-full min-h-[40%] overflow-scroll" placeholder="닉네임은 3자가 넘어야 합니다."/>
                    <button type="button"
                            className="w-[6.5rem] h-[2rem] ml-2 border border-slate-300 rounded-lg bg-slate-200 text-black text-sm md:text-md
                             font-mono hover:bg-slate-700 hover:text-white hover:border-transparent"
                            onClick={handleCheckNickname}>
                        중복확인
                    </button>
                </label>
                <div className="w-full flex justify-center">
                    {checkUserNicknameC && checkUserNicknameC.checkNick===true ? <span className="text-sm md:text-md text-bold font-mono text-green-600 h-[1rem] ">{checkUserNicknameC.nickMessage}</span> : null}
                    {checkUserNicknameC && checkUserNicknameC.checkNick===false ? <span className="text-sm md:text-md text-bold font-mono text-red-600 h-[1rem] ">{checkUserNicknameC.nickMessage}</span> : null}
                </div>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full">프로필 이미지 :</span>
                    <input type="password" name="confirmPassword" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[55%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"/>
                </label>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full">이메일 : </span>
                    <input type="email" name="email" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[55%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"
                    placeholder="입력하지 않으시려면 버튼을 누르지 말아주세요"/>
                    <button type="button"
                    className="w-[6.5rem] h-[2rem] ml-2 border border-slate-300 rounded-lg bg-slate-200 text-black text-sm md:text-md
                             font-mono hover:bg-slate-700 hover:text-white hover:border-transparent"
                            onClick={handleCheckEmail}>
                    중복확인
                </button>
                </label>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full">
                        <span className="text-red-500">*</span>&nbsp;핸드폰 번호 :</span>
                    <input type="phone" name="phone" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[55%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"/>
                    <button type="button"
                            className="w-[6.5rem] h-[2rem] ml-2 border border-slate-300 rounded-lg bg-slate-200 text-black text-sm md:text-md
                             font-mono hover:bg-slate-700 hover:text-white hover:border-transparent"
                            onClick={handleCheckPhone}>
                        중복확인
                    </button>
                </label>
                <label className="flex flex-col items-center my-2 w-full h-[3.2rem] justify-start font-mono">
                    <span className="font-extrabold flex items-center justify-center w-full md:w-[70%] h-full text-purple-500 text-xl md:text-2xl">
                        <span className="text-red-500 flex justify-end text-xl">*&nbsp;</span>개인정보 이용 동의
                        <button type="button"
                            className="w-[6.5rem] h-[2rem] ml-2 border border-slate-300 rounded-lg bg-emerald-200 text-black text-sm md:text-md
                             font-mono hover:bg-emrald-700 hover:text-white hover:border-transparent"
                            onClick={handleCheckPrivacyAgreements}>
                        동의확인
                    </button> </span>
                    <div className="flex flex-row items-center my-1 w-full h-full justify-center font-mono">
                    <span className="text-green-400 text-md md:text-xl font-mono">
                        <span className="font-extrabold text-blue-400 text-md md:text-xl font-mono">개인정보 이용동의</span>에 동의하시면 체크버튼을 눌러주세요</span>
                    <input type="checkbox" name="privacyAgreements" value={1} onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl overflow-hidden"/>
                    </div>
                </label>
                <label className="flex flex-col items-center my-2 w-full h-[5rem] justify-start font-mono">
                    <span className="font-extrabold flex items-center justify-center w-[70%] md:w-[40%] h-full text-purple-500 text-xl md:text-2xl"> 마케팅 이용 동의 </span>
                    <div className="flex flex-row items-center my-1 w-full h-full justify-center font-mono">
                    <span className="text-green-400 text-md md:text-xl font-mono">
                        <span className="font-extrabold text-blue-400 text-md md:text-xl font-mono">마케팅 이용동의</span>에 동의하시면 체크버튼을 눌러주세요</span>
                    <input type="checkbox" name="marketingAgreements" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl overflow-hidden"/>
                    </div>
                    <div className="font-extrabold text-sky-500 text-md md:text-xl font-mono flex flex-center my-2">링크를 누르시면 약관 내용을 볼 수 있습니다!</div>
                </label>
                <label className="flex flex-row items-center mt-10 mb-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full"><span className="text-red-500 flex justify-end text-xl">*&nbsp;</span>생년월일 :</span>
                    <input type="date" name="birthDate" onChange={(e) => {
                       inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[55%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"/>
                </label>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full">
                        <span className="text-red-500 flex justify-end text-xl">*&nbsp;</span>이름 :</span>
                    <input type="text" name="name" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[55%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"/>
                </label>
                <label className="flex flex-row items-center my-2 w-full h-[8rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full"> 자기소개 :</span>
                    <textarea name="selfIntroduction" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem] resize-none
            font-sans my-2 min-w-2xs max-w-6xl w-[55%] h-full overflow-hidden"/>
                </label>
            </form>
        </div>
    )
}