import axios from "axios";

const serverURL="http://localhost:8000/api/cartItemList/myList"
// const serverURL="/api/cartItemList/myList" // 서버 배포할 때 쓸 주소

//장바구니에 아이템 넣기
export async function InsertCart(productId, quantity){
   return axios.post(`${serverURL}`,{
        productNo:productId,
        quantity:quantity
    },{withCredentials:true,
       headers: {"Content-Type": "application/json"}})
}
// 장바구니 리스트 보기
export async function GetCart(){
    return axios.get(`${serverURL}`,{
        withCredentials:true
    })
}

// 장바구니 아이템 한개 삭제
export async function DeleteCartOne(cartItemId){
   return axios({
       method:'delete',
       url:`${serverURL}`,
        data:{cartItemId:cartItemId},
        withCredentials:true,
       headers: {"Content-Type": "application/json"}
    })
}

// 장바구니 아이템 모두 삭제
export async function DeleteCartAll(){
    return axios.delete(`${serverURL}/All`,{
        withCredentials:true
    })
}
// 수량 조절
export async function UpdateQuantity(cartItemId,quantity){
    return axios.put(`${serverURL}`,{
        cartItemId:cartItemId,
        quantity:quantity
    },{
        withCredentials:true,
        headers: {"Content-Type": "application/json"},
    })
}

//totalPrice 가져오기
export async function TotalPrice(){
    return axios(`${serverURL}/totalPrice`,{
        withCredentials:true
    })
}