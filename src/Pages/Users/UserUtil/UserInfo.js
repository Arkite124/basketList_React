import axios from "axios";

const serverURL="http://localhost:8000/api/user"
// const serverURL="/api/user"

// 상대 유저 정보 보기
export async function GetUserInfo(userNickname){
    return axios.get(`${serverURL}/userInfo`,{
        params:userNickname
    })
}

// 판매자 정보 보기
export async function GetSellerInfo(userNickname){
    return axios.get(`${serverURL}/userInfo`,{
        params:userNickname
    })
}

//내 정보 보기
export async function GetMyInfo(){
    return axios.get(`${serverURL}/myInfo`,{
        withCredentials:true
    })
}

// 내 정보 수정
export async function ModifyMyInfo(user){
    return axios.put(`${serverURL}/myInfo`,user,{
        withCredentials:true
    })
}

// 내 상세 정보 수정
export async function ModifyMyInfoDetail(userDetails){
    return axios.put(`${serverURL}/myInfo/details`,userDetails,{
        withCredentials:true
    })
}

//회원 탈퇴
export async function DeleteMyInfo(){
    return axios.delete(`${serverURL}/myInfo`,{
        withCredentials:true
    })
}
