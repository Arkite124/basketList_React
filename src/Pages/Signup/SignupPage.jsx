import React, {useEffect, useRef, useState} from "react";
import {
    CheckEmail,
    CheckPhone, CheckPrivacyAgreements,
    CheckPwCorrect, CheckUserName,
    CheckUserNickname, SignUpUser
} from "./SignupUtil/Signup.js";
import {useModalContext} from "../../Provider/ModalProvider.jsx";
import {useNavigate} from "react-router-dom";

export default function SignupPage(){
    const navigate=useNavigate()
    const PrivacyTitle="개인정보 이용 약관"
    const MarketingTitle="마케팅 정보 이용 약관"
    const CheckTitle="중복정보 미확인" //중복 미확인 모달 띄우기 위함
    const {openModal, closeModal}=useModalContext();
    const signupTitle=("회원가입 성공")
    const signupContent=(<div className="flex flex-col items-center justify-center">
        <img src="/checked_icon.png" alt="성공!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-blue-500/70 text-2xl font-mono mb-5"> 회원가입에 성공하였습니다!</span>
        <span onClick={()=>navigate("/")}>
                        <button className="w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-red-400 hover:text-white"
                                onClick={closeModal}>홈으로</button></span>
    </div>)
    const CheckContent=(checkMessage)=>(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[40%] h-[40%] md:w-[20rem] md:h-[20rem]"/>
        <span className="text-bold text-red-500/70 text-3xl font-mono mb-5">{checkMessage} 확인 해주세요!</span>
        <span><button className="w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-600 text-white text-xl font-mono hover:bg-red-400 hover:text-black"
                      onClick={closeModal}>돌아가기</button></span>
    </div>) //해당 정보 미확인 모달 띄우기 위함
    const PrivacyAgreementContent=(<div className="flex flex-col items-center justify-center h-full w-full">
    <span className="text-bold text-sm md:text-md font-mono mb-3 overflow-y-scroll flex flex-col flex-pre-wrap h-[70%] md:h-[75%] w-full justify-start">
        <span className="text-extrabold text-md md:text-lg font-mono mb-1 h-full">[개인정보 수집 및 이용에 대한 동의]</span>
        회사는 아래와 같이 개인정보를 수집·이용합니다. 이용자는 동의를 거부할 수 있으며, 다만 동의하지 않을 경우 서비스 이용에 일부 제한이 있을 수 있습니다.<br/><br/>
        <ul>1. 수집 항목<br/>
        <li>필수항목: 이름, 생년월일, 휴대전화 번호<br/></li>
        <li>선택항목: 이메일 주소<br/></li>
        </ul><br/>
        <ul>2. 수집 및 이용 목적<br/>
        <li>회원 가입 및 본인 확인<br/></li>
        <li>서비스 제공 및 이용자 식별</li>
        <li>고객 문의 응대 및 공지사항 전달</li>
        </ul><br/>
        <ul>3. 보유 및 이용 기간
        <li>수집일로부터 회원 탈퇴 시까지 (단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관)</li>
        </ul><br/>
        <ul>4. 동의 거부 권리 및 불이익
        <li>귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.<br/>
        단, 필수항목에 대한 동의 거부 시 서비스 이용이 제한될 수 있습니다.</li></ul></span>
        <span>
        <button className="w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-sky-400 hover:text-white"
                onClick={closeModal}>돌아가기</button></span>
    </div>)
    const MarketingAgreementContent=(<div className="flex flex-col items-center justify-center h-full w-full">
        <span className="text-bold text-sm md:text-md font-mono mb-3 overflow-y-scroll flex flex-col flex-pre-wrap h-[70%] md:h-[80%] w-full justify-start">
    <span className="text-extrabold text-md md:text-lg font-mono mb-1 h-full">[마케팅 정보 수신 동의]</span><br/>
        회사는 회원에게 유익한 정보 제공을 위하여 아래와 같이 마케팅 목적의 개인정보를 이용하고자 하며, 이에 대한 동의를 요청드립니다.<br/><br/>
        <ul>1. 이용 목적<br/>
        <li>신규 서비스 및 이벤트 정보 안내<br/></li>
        <li>맞춤형 광고 및 프로모션 제공<br/></li>
        </ul><br/>
        <ul>2. 수신 방법<br/>
        <li>이메일, 문자(SMS/MMS) 등<br/></li>
        <li>서비스 제공 및 이용자 식별</li>
        <li>고객 문의 응대 및 공지사항 전달</li>
        </ul><br/>
        <ul>3. 보유 및 이용 기간
        <li>수신 동의일로부터 회원 탈퇴 또는 수신 동의 철회 시까지</li>
        </ul><br/>
        <ul>4. 동의 거부 권리 및 불이익
        <li>귀하는 마케팅 정보 수신에 대해 동의하지 않을 수 있으며, 미동의 시에도 서비스 이용에는 제한이 없습니다.<br/>
        동의 후에도 언제든지 수신 거부가 가능합니다.</li></ul></span>
        <span>
        <button className="w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-sky-400 hover:text-white"
                onClick={closeModal}>돌아가기</button></span>
    </div>)
    const [confirmPassword,setConfirmPassword]=useState("")
    const [checkUserName,setCheckUserName]=useState({})
    const [checkPwC,setCheckPwC]=useState({}) //비밀번호 확인하는 변수랑 이름이 같으면 안됨 밑에 것들도 그래서 이름이 조금씩 다름 C=correct
    const [checkEmailAdd,setCheckEmailAdd]=useState({})
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
        email:null,
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
        //     })) //추후 파일 첨부 서버 업로드때 구현
        };
    const handleCheckId = async () =>{
        try {
            CheckUserName(user.userName).then(
                res=> {
                    setCheckUserName({"checkName": res.data.checkName, "nameMessage":res.data.nameMessage})
                });
        }catch{
            console.log("아이디 확인 실패")
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
                } catch{
                    console.error("비밀번호 확인 실패");
                }
            };
            fetchCheck();
        }
    }, [user.password, confirmPassword]);//유저 비밀번호 일치 확인
    const handleCheckNickname = async () =>{
        try {
            CheckUserNickname(user.userNickname).then(
                res=> {
                    setCheckUserNickC({"checkNick": res.data.checkNick, "nickMessage":res.data.nickMessage})
                });
        }catch{
            console.log("닉네임 확인 오류 발생")
        }
    }
    const handleCheckEmail = async () =>{
        try {
            CheckEmail(user.email).then(
                res=> {
                    setCheckEmailAdd({"checkEmail": res.data.checkEmail, "mailMessage":res.data.mailMessage})
                });
        }catch{
            console.log("이메일 확인 오류 발생")
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
            <div className="flex flex-row justify-center items-center md:w-full h-[100%]">
            <span className="text-red-500">*</span> &nbsp;표시 되어 있는 항목들은 필수항목 입니다.
            </div>
            <form className="w-[97%] md:w-[60%] xl:w-[50%] flex flex-col justify-center h-full my-2">
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-[20%] md:h-full text-sm md:text-md">
                        <span className="text-red-500 text-sm md:text-md">*</span>&nbsp;아이디 :</span>
                    <input type="text" name="userName" value={user.userName} onChange={(e) => inputHandler(e)}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-full min-h-[40%] overflow-scroll" placeholder="아이디는 6자~16자까지 가능 합니다."/>
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
                    <span className="flex items-center justify-end w-[32%] md:w-[22%] h-[20%] md:h-full text-sm md:text-md"><span className="text-red-500">*</span>&nbsp;비밀번호 :</span>
                    <input type="password" name="password" value={user.password} onChange={(e) => {inputHandler(e)}}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-full min-h-[40%] overflow-scroll"
                           placeholder="비밀번호는 8자~20자까지 가능합니다."/>
                </label>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[32%] md:w-[22%] h-[20%] md:h-full text-sm md:text-md"><span className="text-red-500 text-sm md:text-md">*</span>&nbsp;비밀번호 확인 :</span>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => {
                        setConfirmPassword(e.target.value)}}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-full min-h-[40%] overflow-scroll"
                    placeholder="비밀번호와 일치해야 합니다."/>
                </label>
                <div className="w-full flex justify-center">
                    {user.password!=="" && confirmPassword !=="" && checkPwC.checkPw===true ? <span className="text-sm md:text-md text-bold font-mono text-green-600 h-[1rem] ">{checkPwC.pwMessage}</span> : null}
                    {user.password!=="" && confirmPassword !=="" && checkPwC.checkPw===false ? <span className="text-sm md:text-md text-bold font-mono text-red-600 h-[1rem] ">{checkPwC.pwMessage}</span> : null}
                </div>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-[20%] md:h-full text-sm md:text-md">
                        <span className="text-red-500 text-sm md:text-md">*</span>&nbsp; 닉네임 :</span>
                    <input type="text" name="userNickname" value={user.userNickname} onChange={(e) => inputHandler(e)}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-full min-h-[40%] overflow-scroll" placeholder="닉네임은 3자~12자 까지 가능 합니다."/>
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
                    <span className="flex items-center justify-end w-[35%] md:w-[22%] h-[20%] md:h-full text-sm md:text-md">프로필 이미지 :</span>
                    <select name="profileImgUrl" className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem] text-amber-700
            font-sans my-2 min-w-2xs max-w-6xl w-[50%] md:w-[30%] h-full min-h-[40%]" onChange={(e)=>inputHandler(e)}>
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
                            className="w-[7rem] h-[2rem] ml-2 border border-slate-300 rounded-lg bg-amber-200 text-black text-sm md:text-md
                             font-mono hover:bg-amber-700 hover:text-white hover:border-transparent flex flex-end items-center">
                        이미지 첨부(미구현)</button>
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
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-[20%] md:h-full">
                       <span className="text-red-500 text-sm md:text-md">*</span>&nbsp;역할 선택 :</span>
                    <select name="role" className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem] text-amber-700
            font-sans my-2 min-w-2xs max-w-6xl w-[50%] md:w-[30%] h-full min-h-[40%]" onChange={(e)=>inputHandler(e)}>
                        <option value="BUYER" className="mx-1 text-amber-600 text-sm md:text-md">구매자 only</option>
                        <option value="SELLER" className="mx-1 text-amber-600 text-sm md:text-md">판매자 only</option>
                        <option value="BOTH" className="mx-1 text-amber-600 text-sm md:text-md">구매 & 판매 가능자</option>
                    </select>
                </label>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full text-sm md:text-md">이메일 : </span>
                    <input type="email" name="email" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-full min-h-[40%] overflow-scroll"
                    placeholder="입력을 원치 않으시면 버튼을 누르지 말아주세요"/>
                    <button type="button"
                    className="w-[6.5rem] h-[2rem] ml-2 border border-slate-300 rounded-lg bg-slate-200 text-black text-sm md:text-md
                             font-mono hover:bg-slate-700 hover:text-white hover:border-transparent"
                            onClick={()=>handleCheckEmail}>
                    중복확인
                </button>
                </label>
                <div className="w-full flex justify-center">
                    {checkEmailAdd && checkEmailAdd.checkEmail===true ? <span className="text-sm md:text-md text-bold font-mono text-green-600 h-[1rem] ">{checkEmailAdd.mailMessage}</span> : null}
                    {checkEmailAdd && checkEmailAdd.checkEmail===false ? <span className="text-sm md:text-md text-bold font-mono text-red-600 h-[1rem] ">{checkEmailAdd.mailMessage}</span> : null}
                </div>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[35%] md:w-[22%] h-[20%] md:h-full text-sm md:text-md">
                        <span className="text-red-500 text-sm md:text-md">*</span>&nbsp;핸드폰 번호:</span>
                    <input type="phone" name="phone" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-full min-h-[40%] overflow-scroll" placeholder="입력창에 '-'를 붙이지 말아주세요"/>
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
                        <span className="font-extrabold text-blue-500 text-md md:text-xl font-mono underline cursor-pointer" onClick={()=>{openModal(PrivacyTitle,PrivacyAgreementContent)}}>개인정보 이용동의</span>에 동의하시면 체크버튼을 눌러주세요</span>
                    <input type="checkbox" name="privacyAgreements" checked={user.privacyAgreements} onChange={(e)=>inputHandler(e)}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl overflow-hidden w-[1rem] h-[1rem] pointer"/>
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
                        <span className="font-extrabold text-blue-500 text-md md:text-xl font-mono underline cursor-pointer" onClick={()=>{openModal(MarketingTitle,MarketingAgreementContent)}}>마케팅 이용동의</span>에 동의하시면 체크버튼을 눌러주세요</span>
                    <input type="checkbox" name="marketingAgreements" checked={user.marketingAgreements} onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[1rem] h-[1rem] overflow-hidden"/>
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
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-full min-h-[40%] overflow-scroll"/>
                </label>
                <div className="w-full flex justify-center">
                    {user.birthDate>=Date.now() ? <span className="text-sm md:text-md text-bold font-mono text-red-600 h-[1rem]">생일은 현재 날짜보다 늦을 수 없습니다.</span> : null}
                </div>
                <label className="flex flex-row items-center my-2 w-full h-[2rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full">
                        <span className="text-red-500 flex justify-end text-xl">*&nbsp;</span>이름 :</span>
                    <input type="text" name="name" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[70%] md:w-[50%] h-full min-h-[40%] overflow-scroll" placeholder="이름을 정확하게 입력해주세요."/>
                </label>
                <label className="flex flex-row items-center my-2 w-full h-[4rem] justify-start font-mono">
                    <span className="flex items-center justify-end w-[30%] md:w-[22%] h-full"> 자기소개 :</span>
                    <textarea name="selfIntroduction" onChange={(e) => {
                        inputHandler(e)
                    }}
                           className="border border-sky-300 focus:outline-none focus:border-sky-300 focus:ring-sky-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem] resize-none
            font-sans my-2 min-w-2xs max-w-6xl w-full md:w-[50%] h-full overflow-hidden" placeholder="자기소개는 간단히 자기를 어필할 수 있게 써주세요. 없어도 됩니다."/>
                </label>
                <div className="w-[74%] flex justify-end h-[3rem] mb-3">
                    <button type="button"
                            className="w-[8.5rem] h-full ml-2 border border-slate-300 rounded-lg bg-amber-200 text-black text-md md:text-xl
                             font-mono hover:bg-amber-700 hover:text-white hover:border-transparent" onClick={()=> {
                        if(!checkUserName.checkName) openModal(CheckTitle,CheckContent("아이디"))
                        if(!checkPrivacyAgreementsC.isAgree) openModal(CheckTitle,CheckContent("정보동의"))
                        if(!checkEmailAdd) openModal(CheckTitle,CheckContent("이메일"))
                        if(!checkUserNickC.checkNick) openModal(CheckTitle,CheckContent("닉네임"))
                        if(!checkPhoneC.checkPhone) openModal(CheckTitle,CheckContent("아이디"))
                        if(user.birthDate>=Date.now()) openModal(CheckTitle,CheckContent("생년월일"))
                        SignUpUser(user).then(
                            res=>{
                                const signUpUserData=res.data
                                openModal(signupTitle,signupContent)
                                return signUpUserData
                            }
                        ).catch(error=>{
                            console.log("User:"+error.message)
                            console.log(error.status)
                            return "오류발생";
                        })
                    }}>
                        회원가입</button>
                </div>
            </form>
        </div>
    )
}