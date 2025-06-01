import axios from "axios";

const serverURL="http://localhost:8000/api/userStatus/register"
// const serverURL="/api/userStatus/register" // 배포용 주소

export function CheckUserName({userName}){
    axios.post(`${serverURL}/check-userName`,{
        userName:userName
    }).then(res=>{
        const checkUserNameData=res.data
        console.log("중복확인")
        return checkUserNameData
    }).catch((error)=>{
        console.log("name:"+error.message)
        console.log(error.status)
        return "오류발생";
        })}
export function CheckUserNickname({userNickname}){
    axios.get(
        `${serverURL}/check-nickname`,{
            params:{userNickname}
        }).then(
        response=>{
            const checkNicknameData=response.data
            console.log("중복확인")
            return checkNicknameData
        }
    ).catch(error=>{
        console.log("nickName:"+error.message)
        console.log(error.status)
        return "오류발생";
    })}//닉네임 중복체크
export function CheckPwCorrect({password,confirmPassword}){
    axios.post(
        `${serverURL}/check-password`,{
            password:password,
            confirmPassword:confirmPassword
        }
    ).then(
        response=>{
            const checkPwData=response.data
            console.log("일치확인")
            return checkPwData
        }
    ).catch(error=>{
        console.log("checkPw:"+error.message)
        console.log(error.status)
        return "오류발생";
    })
}
export function CheckEmail({email}){
    axios.post(`${serverURL}/check-email`,{
        email:email
    }).then(
        res=>{
            const checkEmailData=res.data
            console.log("일치확인")
            return checkEmailData
        }
    ).catch(error=>{
        console.log("Email:"+error.message)
        console.log(error.status)
        return "오류발생";
    })
}
export function CheckPhone({phone}){
    axios.post(`${serverURL}/check-phone`,{
        phone:phone
    }).then(
        res=>{
            const checkPhoneData=res.data
            console.log("일치확인")
            return checkPhoneData
        }
    ).catch(error=>{
        console.log("Phone:"+error.message)
        console.log(error.status)
        return "오류발생";
    })
}
export function CheckPrivacyAgreements({privacyAgreements}){
    axios.post(`${serverURL}/check-privacyAgreements`,{
        privacyAgreements:privacyAgreements
    }).then(
        res=>{
            const checkPrivacyAgreementsData=res.data
            console.log("동의확인")
            return checkPrivacyAgreementsData
        }).catch(error=>{
        console.log("PrivacyAgreements:"+error.message)
        console.log(error.status)
        return "오류발생";
    })
}
//요까지 중복체크
export function SignUpUser({user}){
    axios.post(`${serverURL}/user`,{
        user
    }).then(
        res=>{
            const signUpUserData=res.data
            console.log("가입 완료")
            return signUpUserData
        }
    ).catch(error=>{
        console.log("User:"+error.message)
        console.log(error.status)
        return "오류발생";
    })
}
//가입