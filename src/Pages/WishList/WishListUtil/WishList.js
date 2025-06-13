import axios from "axios";

const serverURL="http://localhost:8000/api/wishList/wish"
// const serverURL="/api/wishList/wish"

// 위시리스트 보기
export async function GetWishList(){
    return axios.get(`${serverURL}`,{
        withCredentials:true
    })
}

// 위시리스트 상태보기(내가 이미 추가한거면 뜨게)
export async function GetWishStatus(wishProductNo){
    return axios({
        method:'GET',
        url:`${serverURL}/status`,
        data:{wishProductNo:wishProductNo},
        withCredentials:true,
        headers: {"Content-Type": "application/json"}
    })
}

// 위시리스트에 추가
export async function AddWishList(wishProductNo){
    return axios.post(`${serverURL}`,{
        wishProductNo:wishProductNo
    },{
        withCredentials:true,
        headers: {"Content-Type": "application/json"}
    })
}

// wishList 삭제
export async function DeleteWishList(wishProductNo){
    return axios({
        method:'delete',
        url:`${serverURL}`,
        data:{wishProductNo:wishProductNo},
        withCredentials:true,
        headers: {"Content-Type": "application/json"}
    })
}

