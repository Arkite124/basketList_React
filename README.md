# ** basketList의 프론트앤드 목적으로 설계한 Git-Repository 입니다.**

프로젝트 소개 및 개요는 Springboot 쪽에 있을 것이고,
여기는 프론트쪽 설계시 패치 내역을 함께 올리도록 하겠습니다.  

### 이미지 사용 관련 안내

본 프로젝트에 사용된 모든 상품 이미지는 구글/네이버 쇼핑과 같은 쇼핑사이트에서 수집된 공개 상품 홍보 이미지로,
**비상업적 포트폴리오 및 학습용 목적**으로만 사용되었으며,
상업적 목적이나 유료 서비스에 사용되지 않습니다.

이미지에 대한 저작권은 각 상품 제공처 및 브랜드에 귀속됩니다.

문제될 시 메일(ghkddudwnd@naver.com(자주 확인)
/ ghkddudwnd@gmail.com(거의 확인 안함)) 주시면 해당이미지 확인 후 수정하도록 하겠습니다.

1. firstCommit : Readme 작성 및 기초 작업
2. add image : springboot에서 작성해놓은 샘플데이터에 맞춘 이미지파일 추가(노가다)
3. Readme : Readme에 연락방법 추가
4. App : React-Router-dom 설치 및 기본 예상 구조 형성
5. page : 예상구조에 맞는 페이지 임시구성, 로컬서버 포트 수정(팀프로젝트와 다른 포트 사용)
6. modal : 홈페이지 기초 CSS 구성 및 @Headlessui로 모달 전역 컴포넌트 생성, tailwindcss 익히는 중(생각보다 어렵...)
한데 익히면 더 쉬워질거 같긴 함 bootstrap보다 자율성도 좋고 설정도 해볼만 함
7. Provider : ModalProvider로 App 전역을 감쌌고, LoginProvider도 axios를 처음 써보는 프로젝트라서 진행중...
tailwindcss 아직 익히는 중(익힐게 많음... 글씨체 같은것도 따로 지원)
font-awesome, googleFont 설치 및 아이콘 적용 및 폰트 알아보다 끝남 다음에 다시...
8. Product_main : 상품 예시화면 랜덤으로 3개 뜨게 적용함 그에 따라 spring boot 쪽 코드도 바뀜
폰트 수정은 아직... 로딩 컨텐츠랑 이미지 불러와지지 않는 오류도 해결해야 함 개인적인 일로 어제꺼와 오늘거 함께 commit 합니다...
9. product : 리스트 사진 정장적으로 불러와짐, DB랑 맞지 않는 사진의 이름 일부 수정, Provider 전부가 로딩된 후 로딩 되도록 전체구조 수정 
검색결과는 페이지 주소는 나옴, 검색의 구조와 페이지는 구현, 검색 결과는 아직 나오지 않음. tailwind 적용하면서 리액트 버전 다운그레이드한 
내역 지금 작성했음 장바구니+ bottomNavBar를 어떻게 할지 고민중
10. quantity : 장바구니에 담을 수량 상태 조절중에 단순히 useState로 quantity 만 조절하면 전체 수량이 바뀌기 때문에 
ProductName을 통해 고유 수량을 부여받음 로그아웃 버튼 누르면 로그아웃 모달 뜨면서 Home 으로 이동 되게 함, 전체 수량이 0미만 10이상으로
조절되지 않게끔 유도함(modal을 띄움) loginUser 이면 기본적으로 수량과 담기,사기 버튼이 보이는데, user.role이 SELLER인 경우에도 안보이게
설정함. login이 됬을때 modal이 안뜨는 오류가 생겨서 수정해야 함.
11. cartList : BottomNavBar를 두개로 분리, 하나는 버튼누르면 나오는 장바구니 리스트, 하나는 fixed 형태로 floating 상태인
정통 sideNavBar 두개로 분리해서 버튼 눌렀을때 나오는 장바구니는 간소화, sideNavBar 형태로 나와서 들어갈 수 있는 장바구니 링크는 세세한 내역
그리고 sideNavBar에 구현하고자 하는 메뉴들은 이동하는 링크(navigate)로 들어가는 myInfo와 cartList,
컴포넌트 시험은 안해봐서 아직 오류상태 자체는 모름 일단 구현만 해놓고 commit 후 오류 날 시 수정은 다음번에... 
추후 sideNavBar에 구현할 SELLER는 안보이는 구매내역(매우 나중), BUYER는 안보이는 판매 등록, 수정, 삭제 링크 