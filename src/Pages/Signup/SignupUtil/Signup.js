import axios from "axios";

const serverURL="http://localhost:8000/api/userStatus/register"
// const serverURL="/api/userStatus/register" // 배포용 주소

export function CheckUserName(userName) {
     return  axios.post(`${serverURL}/check-userName`,
        {userName}, {
            headers: {"Content-Type": "application/json"}
        });}
//ID 중복 체크 완료
export function CheckUserNickname(userNickname){
   return axios.get(
        `${serverURL}/check-nickname`,{
            params:{userNickname},
            headers: {"Content-Type": "application/json"}
        })}
//닉네임 중복체크
export function CheckPwCorrect({password,confirmPassword}){
       return axios.post(
           `${serverURL}/check-password`, {
               password: password,
               confirmPassword: confirmPassword
           }, {
               headers: {"Content-Type": "application/json"},
           })
}
//비밀번호 일치 확인

export async function CheckEmail(email){
    return axios.post(`${serverURL}/check-email`,{
        email:email
    },{
        headers: {"Content-Type": "application/json"}
    })}
//이메일 중복 확인

export async function CheckPhone(phone){
   return axios.post(`${serverURL}/check-phone`,{
        phone:phone
    },{
       headers: {"Content-Type": "application/json"}
   })}
//핸드폰 중복 확인 여기까지 중복체크

export async function CheckPrivacyAgreements(privacyAgreements){
   return axios.post(`${serverURL}/check-privacyAgreements`,
       {privacyAgreements:privacyAgreements},{
           headers: {"Content-Type": "application/json"}
       })}
//개인정보 이용동의 확인

export async function SignUpUser(user){
   return axios.post(`${serverURL}/user`,
    user,{
       headers: {"Content-Type": "application/json"}
   })
}
//가입