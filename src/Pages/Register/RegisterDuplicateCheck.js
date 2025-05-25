import axios from "axios";

const serverURL="http://localhost:8000/api/userStatus/register"

export function checkUserNickname({userNickname}){
    axios.get(
        `${serverURL}/check-nickname`,{
            params:{userNickname}
        }).then(
        response=>{
            const checkNicknameData=response.data
            console.log(checkNicknameData)
            return checkNicknameData
        }
    ).catch(error=>{
        console.log(error.status+"")
        return error.message;
    })}
export function checkPwCorrect({password,confirmPassword}){
    axios.post(
        `${serverURL}/check=password`,{
            password:password,
            confirmPassword:confirmPassword
        }
    ).then(
        response=>{
            const checkPwData=response.data
            console.log(checkPwData)
            return checkPwData
        }
    ).catch(error=>{
        console.log(error.status+"")
        return error.message;
    })
}