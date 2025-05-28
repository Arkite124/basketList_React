import {useContext, useState} from "react";
import {LoginContext} from "../Provider/LoginProvider.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useModalContext} from "../Provider/ModalProvider.jsx";
import Loading from "../components/Loading.jsx";


export default function LoginPage(){
    const serverURL="http://localhost:8000/api/userStatus/login"
    const [, setLoginUser,isLoading]=useContext(LoginContext)
    const navigate=useNavigate()
    const [user,setUser]=useState({userName:"",current_password:""})
    const {openModal,closeModal}=useModalContext();
    const [title,setTitle]=useState("유저 정보 오류")
    const [content,setContent]=useState(<div className="flex flex-col items-center justify-center">
        <img src="/alert_icon.png" alt="주의!" className="w-[10rem] h-[10rem]"/>
        <span className="text-bold text-red-500/70 text-2xl font-mono mb-5">아이디나 비밀번호가 <br/>
            일치하지 않습니다. <br/> 혹은 존재하지 않는 유저입니다.</span>
        <span><button className="w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-400/50 text-black text-xl font-mono hover:bg-red-400 hover:text-white"
                      onClick={closeModal}>돌아가기</button></span>
    </div>)
    const [loadingUser,setLoadingUser]=useState(false)
    const inputHandler = (e) => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    const loginHandler = async (e) =>{
        e.preventDefault()
        try {
           await axios.post(serverURL,{
                userName:user.userName,
                password:user.current_password
            })
               .then(response=>{
                const userData=response.data
                   console.log(userData)
                setLoadingUser(true)
                if(loadingUser){
                setLoginUser(userData)
                setTitle("로그인 성공")
                setContent(<div className="flex flex-col items-center justify-center">
                    <img src="/checked_icon.png" alt="성공!" className="w-[10rem] h-[10rem]"/>
        <span className="text-bold text-blue-500/70 text-2xl font-mono mb-5">로그인에 성공하였습니다!</span>
                    <span onClick={()=>navigate("/")}>
                        <button className="w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-red-400 hover:text-white"
                                  onClick={closeModal}>홈으로</button></span>
                </div>)
                }}
            )
        }catch (error) {
            console.log(error.message)
            setTitle("홈페이지 오류!")
            setContent(<div className="flex flex-col items-center justify-center">
                <img src="/alert_icon.png" alt="주의!" className="w-[10rem] h-[10rem]"/>
        <span className="text-bold text-red-500/70 text-2xl font-mono mb-5">알수 없는 오류가 발생하였습니다.</span>
                <span><button className="w-[12.5rem] h-[3rem] mr-3 rounded-lg bg-red-400/50 text-black text-xl font-mono hover:bg-red-400 hover:text-white"
                              onClick={closeModal}>돌아가기</button></span>
            </div>)
            openModal(title,content)
        }finally {
            openModal(title,content)
        }
    }
    if(!isLoading) return <Loading message={"로그인 창"}/>
    if(isLoading) return(
    <div className="flex flex-col top-[4rem] absolute w-full items-center h-[75%]">
        <h2 className="text-3xl text-bold font-mono text-blue-900/40 mb-3">로그인 하기</h2>
        <form className="w-0.75 flex flex-col h-full">
            <label className="flex flex-row items-center w-full h-[10%] justify-center font-mono">
                <span className="flex items-center w-[15%] h-full"> ID :</span>
                <input type="text" name="userName" onChange={(e) => {
                    inputHandler(e)
                }}
                       className="border border-purple-300 focus:outline-none focus:border-purple-300 focus:ring-purple-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[82%] h-[60%] min-h-[40%] max-h-[80%] overflow-scroll"/>
            </label>
            <label className="flex items-center w-full h-[10%] font-mono">
                <span className="flex items-center w-[15%] h-full"> PW :</span><input type="password"
                  name="current_password"
                  onChange={(e) => {
                      inputHandler(e)
                  }}
                  className="border border-purple-300 focus:outline-none focus:border-purple-300 focus:ring-purple-300
            focus:ring-1 rounded-md text-md shadow-sm placeholder-slate-400 ml-[0.5rem]
            font-sans my-2 min-w-2xs max-w-6xl w-[82%] h-[60%] min-h-[40%] max-h-[80%] overflow-scroll flex-end"/>
            </label>
            <div className="flex flex-row justify-between">
                <span><button
                    className="w-[7.5rem] h-[3rem] mr-3 rounded-lg bg-amber-600 text-black text-xl font-mono hover:bg-amber-600/50 hover:text-white"
                    onClick={() => {
                        navigate("/register")
                    }}>
                    회원가입
                </button></span>
                <span><button
                    className="w-[7.5rem] h-[3rem] mr-3 rounded-lg bg-sky-400/50 text-black text-xl font-mono hover:bg-sky-400 hover:text-white"
                    onClick={loginHandler}>
                    로그인
                </button></span>
            </div>
        </form>
    </div>
    )
}
