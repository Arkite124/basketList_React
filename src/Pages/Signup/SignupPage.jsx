import React, {useEffect, useRef, useState} from "react";
import {
    CheckEmail,
    CheckPhone, CheckPrivacyAgreements,
    CheckPwCorrect, CheckUserName,
    CheckUserNickname, SignUpUser
} from "./SignupUtil/Signup.js";
import {useModalContext} from "../../Provider/ModalProvider.jsx";

export default function SignupPage(){
    const PrivacyTitle="개인정보 이용 약관"
    const MarketingTitle="마케팅 정보 이용 약관"
    const {openModal, closeModal}=useModalContext();
    const [confirmPassword,setConfirmPassword]=useState("")
    const [checkUserName,setCheckUserName]=useState({})
    const [checkPwC,setCheckPwC]=useState({}) //비밀번호 확인하는 변수랑 이름이 같으면 안됨 밑에 것들도 그래서 이름이 조금씩 다름 C=correct
    const [checkEmailAdd,setCheckEmailAdd]=useState({"checkEmail":true,"mailMessage":null})
    const [checkUserNickC,setCheckUserNickC]=useState({})
    const [checkPrivacyAgreementsC,setCheckPrivacyAgreementsC]=useState({})
    const [checkPhoneC,setCheckPhoneC]=useState({})
    // const fileInputRef = useRef(null);

    const [user,setUser]=useState({
        userName:"",
        password:"",
        profileImgUrl:null,
        userNickname:"",
        selfIntroduction:"",
        role:"",
        email:"",
        phone:"",
        privacyAgreements:false,
        marketingAgreements:false,
        birthDate:"",
        name:""
    })
    const inputHandler = (e) => {
        const { name, type, value, checked } = e.target;
        setUser(prev => ({...prev, [name]: type === "checkbox" ? checked : value}));
        // if(name ==="profileImgUrl" && files && files[0]){
        //     const imageUrl = URL.createObjectURL(files[0])
        //     setUser((prev)=>({
        //         ...prev,[name]:imageUrl
        //     }))
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

    useEffect(() => {
        // 둘 다 값이 있을 때만 요청
        if (user.password && confirmPassword) {
            const fetchCheck = async () => {
                try {
                    const res = await CheckPwCorrect({
                        password: user.password,
                        confirmPassword: confirmPassword,
                    });
                    setCheckPwC({
                        checkPw: res.data.checkPw,
                        pwMessage: res.data.pwMessage,
                    });
                } catch (err) {
                    console.error("비밀번호 확인 실패:", err);
                }
            };
            fetchCheck();
        }
    }, [user.password, confirmPassword]);
    const handleCheckNickname = async () =>{
        try {
            CheckUserNickname(user.userNickname).then(
                res=> {
                    setCheckUserNickC({"checkNick": res.data.checkNick, "nickMessage":res.data.nickMessage})
                });
        }catch (e){
            console.log(e.message)
        }
    }
    const handleCheckEmail = async () =>{
        if(user.email==="" || user.email===null) return checkEmailAdd
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
                    setCheckPhoneC({"checkPhone": res.data.checkPhone, "phoneMessage":res.data.phoneMessage})
                });
        }catch (e){
            console.log(e.message)
        }
    }
    const handleCheckPrivacyAgreements = async () =>{
        try {
            CheckPrivacyAgreements(user.privacyAgreements).then(
                res=> {
                    setCheckPrivacyAgreementsC({"isAgree": res.data.isAgree, "agreeMessage":res.data.agreeMessage})
                });
        }catch (e){
            console.log(e.message)
        }
    }
    const [viewImg,setViewImg]=useState(false)
    useEffect(() => {
        if(user.profileImgUrl===null || user.profileImgUrl==="null"){
            setViewImg(false)
        }
        setViewImg(true)
    }, [user.profileImgUrl]);
    return(
        <div className="flex flex-col justify-center items-center md:w-full h-[120%]">
            <h2 className="text-3xl text-bold font-mono text-sky-600">회원가입 페이지</h2>
            <div className="flex flex-row justify-center items-center md:w-full h-[120%]">
            <span className="text-red-500">*</span> &nbsp;표시 되어 있는 항목들은 필수항목 입니다.
            </div>
            <form className="w-0.9 md:w-[50%] flex flex-col justify-center h-full my-2">
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full"><span className="text-red-500">*</span>&nbsp;아이디 :</span>
                    <input type="text" name="userName" value={user.userName} onChange={(e) => inputHandler(e)}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-[20rem] md:h-full min-h-[40%] overflow-scroll" placeholder="아이디는 6자가 넘어야 합니다."/>
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
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"
                           placeholder="비밀번호는 8자가 넘어야 합니다."/>
                </label>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full"><span className="text-red-500">*</span>&nbsp;비밀번호 확인 :</span>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => {
                        setConfirmPassword(e.target.value)}}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"
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
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-[20rem] md:h-full min-h-[40%] overflow-scroll" placeholder="닉네임은 3자가 넘어야 합니다."/>
                    <button type="button"
                            className="w-[6.5rem] h-[2rem] ml-2 border border-slate-300 rounded-lg bg-slate-200 text-black text-sm md:text-md
                             font-mono hover:bg-slate-700 hover:text-white hover:border-transparent"
                            onClick={handleCheckNickname}>
                        중복확인
                    </button>
                </label>
                <div className="w-full flex justify-center">
                    {checkUserNickC && checkUserNickC.checkNick===true ? <span className="text-sm md:text-md text-bold font-mono text-green-600 h-[1rem] ">{checkUserNickC.nickMessage}</span> : null}
                    {checkUserNickC && checkUserNickC.checkNick===false ? <span className="text-sm md:text-md text-bold font-mono text-red-600 h-[1rem] ">{checkUserNickC.nickMessage}</span> : null}
                </div>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full">프로필 이미지 :</span>
                    <select name="profileImgUrl" className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem] text-amber-700
            font-sans my-2 min-w-2xs max-w-6xl w-[50%] md:w-[30%] h-[20rem] md:h-full min-h-[40%]" onChange={(e)=>inputHandler(e)}>
                        <option value={"/Image/userProfileImg/defaultUser.jpg"} className="mx-1 text-emerald-600 text-md">선택안함</option>
                        <option value={"/Image/userProfileImg/user_icons.png"} className="mx-1 text-gray-600 text-md">기본</option>
                        <option value={"/Image/userProfileImg/user_green.png"} className="mx-1 text-green-600 text-md">초록색</option>
                        <option value={"/Image/userProfileImg/user_orange.png"} className="mx-1 text-green-600 text-md">오렌지색</option>
                    </select>
            {/*        <input type="file" accept={"image/*"} name="profileImgUrl" onChange={(e) => {*/}
            {/*            inputHandler(e)*/}
            {/*        }}*/}
            {/*               className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300*/}
            {/*focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]*/}
            {/*font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[40%] h-[20rem] md:h-full min-h-[40%] hidden" ref={fileInputRef} disabled={true}/>*/}
                    <button type="button"
                            className="w-[12rem] h-[2rem] ml-2 border border-slate-300 rounded-lg bg-amber-200 text-black text-sm md:text-md
                             font-mono hover:bg-amber-700 hover:text-white hover:border-transparent flex flex-end items-center">
                        이미지 첨부(서버때구현)</button>
                </label>
                <div className="flex flex-row justify-center items-center w-full">
                {viewImg && user.profileImgUrl!==null ?
                        <div className="flex flex-col justify-center items-center  w-[6rem] h-[6rem] my-3">
                    <span className="mx-1 text-amber-600 text-md md:text-lg flex flex-row justify-center w-full h-[20%] mb-2">미리보기</span>
                    <img src={user.profileImgUrl} alt={"프로필"} className="w-full h-full flex border justify-center"/>
                        </div>
                 : <div className="h-0 hidden"></div>}
                </div>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full">
                       <span className="text-red-500">*</span>&nbsp;역할 선택 :</span>
                    <select name="role" className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem] text-amber-700
            font-sans my-2 min-w-2xs max-w-6xl w-[50%] md:w-[30%] h-[20rem] md:h-full min-h-[40%]" onChange={(e)=>inputHandler(e)}>
                        <option value="BUYER" className="mx-1 text-amber-600 text-md">구매자 only</option>
                        <option value="SELLER" className="mx-1 text-amber-600 text-md">판매자 only</option>
                        <option value="BOTH" className="mx-1 text-amber-600 text-md">구매 & 판매 가능자</option>
                    </select>
                </label>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full">이메일 : </span>
                    <input type="email" name="email" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"
                    placeholder="입력을 원치 않으시면 버튼을 누르지 말아주세요"/>
                    <button type="button"
                    className="w-[6.5rem] h-[2rem] ml-2 border border-slate-300 rounded-lg bg-slate-200 text-black text-sm md:text-md
                             font-mono hover:bg-slate-700 hover:text-white hover:border-transparent"
                            onClick={()=>handleCheckEmail}>
                    중복확인
                </button>
                </label>
                <div className="w-full flex justify-center">
                    {checkEmailAdd.mailMessage!==null && checkEmailAdd.checkEmail===true ? <span className="text-sm md:text-md text-bold font-mono text-green-600 h-[1rem] ">{checkEmailAdd.mailMessage}</span> : null}
                    {checkEmailAdd.mailMessage!==null && checkEmailAdd.checkEmail===false ? <span className="text-sm md:text-md text-bold font-mono text-red-600 h-[1rem] ">{checkEmailAdd.mailMessage}</span> : null}
                </div>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full">
                        <span className="text-red-500">*</span>&nbsp;핸드폰 번호 :</span>
                    <input type="phone" name="phone" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"/>
                    <button type="button"
                            className="w-[6.5rem] h-[2rem] ml-2 border border-slate-300 rounded-lg bg-slate-200 text-black text-sm md:text-md
                             font-mono hover:bg-slate-700 hover:text-white hover:border-transparent"
                            onClick={handleCheckPhone}>
                        중복확인
                    </button>
                </label>
                <div className="w-full flex justify-center">
                {checkPhoneC && checkPhoneC.checkPhone===true ? <span className="text-sm md:text-md text-bold font-mono text-green-600 h-[1rem] ">{checkPhoneC.phoneMessage}</span> : null}
                {checkPhoneC && checkPhoneC.checkPhone===false ? <span className="text-sm md:text-md text-bold font-mono text-red-600 h-[1rem] ">{checkPhoneC.phoneMessage}</span> : null}
                </div>
                <label className="flex flex-col items-center my-2 w-full h-[4rem] justify-start font-mono">
                    <span className="font-extrabold flex items-center justify-center w-full md:w-[70%] h-full text-purple-500 text-xl md:text-2xl">
                        <span className="text-red-500 flex justify-end text-xl">*&nbsp;</span>개인정보 이용 동의
                        <span className="ml-2 w-[6.5rem] h-[2rem]">
                            <button type="button"
                                className="w-full h-full border border-slate-300 rounded-lg bg-emerald-200 text-black text-sm md:text-md
                             font-mono hover:bg-emerald-700 hover:text-white hover:border-transparent"
                                onClick={handleCheckPrivacyAgreements}>
                        동의확인
                    </button></span>
                    </span>
                    <div className="flex flex-row items-center my-1 w-full h-full justify-center font-mono">
                    <span className="text-green-400 text-md md:text-xl font-mono mb-1">
                        <span className="font-extrabold text-blue-500 text-md md:text-xl font-mono">개인정보 이용동의</span>에 동의하시면 체크버튼을 눌러주세요</span>
                    <input type="checkbox" name="privacyAgreements" checked={user.privacyAgreements} onChange={(e)=>inputHandler(e)}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl overflow-hidden"/>
                    </div>
                </label>
                <div className="w-full flex justify-center">
                    {checkPrivacyAgreementsC && checkPrivacyAgreementsC.isAgree===true ? <span className="text-sm md:text-md text-bold font-mono text-green-600 h-[1rem] ">{checkPrivacyAgreementsC.agreeMessage}</span> : null}
                    {checkPrivacyAgreementsC && checkPrivacyAgreementsC.isAgree===false ? <span className="text-sm md:text-md text-bold font-mono text-red-600 h-[1rem] ">{checkPrivacyAgreementsC.agreeMessage}</span> : null}
                </div>
                <label className="flex flex-col items-center my-2 w-full h-[5rem] justify-start font-mono">
                    <span className="font-extrabold flex items-center justify-center w-[70%] md:w-[40%] h-full text-purple-500 text-xl md:text-2xl"> 마케팅 이용 동의 </span>
                    <div className="flex flex-row items-center my-1 w-full h-full justify-center font-mono">
                    <span className="text-green-400 text-md md:text-xl font-mono">
                        <span className="font-extrabold text-blue-500 text-md md:text-xl font-mono">마케팅 이용동의</span>에 동의하시면 체크버튼을 눌러주세요</span>
                    <input type="checkbox" name="marketingAgreements" checked={user.marketingAgreements} onChange={(e) => {
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
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"/>
                </label>
                <div className="w-full flex justify-center">
                    {user.birthDate>Date.now() ? <span className="text-sm md:text-md text-bold font-mono text-red-600 h-[1rem]">생일은 현재 날짜보다 늦을 수 없습니다.</span> : null}
                </div>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full">
                        <span className="text-red-500 flex justify-end text-xl">*&nbsp;</span>이름 :</span>
                    <input type="text" name="name" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-[20rem] md:h-full min-h-[40%] overflow-scroll"/>
                </label>
                <label className="flex flex-row items-center my-2 w-full h-[4rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full"> 자기소개 :</span>
                    <textarea name="selfIntroduction" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem] resize-none
            font-sans my-2 min-w-2xs max-w-6xl w-[50%] h-full overflow-hidden"/>
                </label>
                <div className="w-[74%] flex justify-end h-[3rem] mb-3">
                    <button type="button"
                            className="w-[8.5rem] h-full ml-2 border border-slate-300 rounded-lg bg-amber-200 text-black text-md md:text-xl
                             font-mono hover:bg-amber-700 hover:text-white hover:border-transparent" onClick={()=>SignUpUser({user})}>
                        회원가입</button>
                </div>
            </form>
        </div>
    )
}