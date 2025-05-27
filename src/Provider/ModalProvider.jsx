import {createContext, useState, useContext, useEffect} from "react";
import {Dialog} from "@headlessui/react";

const ModalContext=createContext(null);

export function ModalProvider({ children }){
    const [isOpen,setIsOpen]=useState(false)
    const [modalContent,setModalContent]=useState(<div></div>)
    const [modalTitle,setModalTitle]=useState("")
    const [modalReady,setModalReady]=useState(false)

    useEffect(() => {
        // 예시: 모달 초기 설정 완료 후 isReady 설정
        setTimeout(() => {
            setModalReady(true);
        }, 300); // 딜레이 예시
    }, []);

    const openModal=(title,content) => {
        setModalTitle(title)
        setModalContent(content)
        setIsOpen(true)}
    const closeModal = () =>{
        setModalTitle("")
        setIsOpen(false);
        setModalContent(<div></div>);
    }

    return (
        <ModalContext.Provider value={{isOpen, openModal, closeModal,modalTitle,modalContent,modalReady}}>
            {isOpen &&
            <Dialog open={isOpen} onClose={closeModal} className="z-50"> {/*모달 컴포넌트 우선순위 Z-index:50설정*/}
            <div className="fixed inset-0 bg-black bg-opacity-40" aria-hidden="true"> {/*모달 컴포넌트 바깥 배경 투명도 40설정*/}
                <div className="fixed inset-0 flex h-[50rem] items-center justify-center p-[0.3rem] bg-green-300/10">{/*모달 안쪽 컴포넌트들 가운데로 정렬, 전체 패딩 3%*/}
                    <Dialog.Panel className="relative top-0 h-[25rem] bg-white rounded-md p-[1rem]
                     min-w-sm max-w-lg w-3/4 shadow-gray-700-lg flex flex-col items-center">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 border-transparent hover:text-gray-700"
                        >
                            X
                        </button>
                        <Dialog.Title className="flex flex-col text-3xl text-black font-mono text-blue-900 pb-3 items-center justify-center w-full
                        ">{modalTitle}</Dialog.Title>

                        {modalContent}
                    </Dialog.Panel>
                </div>
            </div>
            </Dialog>}
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () =>{
    const context=useContext(ModalContext);
    if(!context) throw new Error("모달은 ModalProvider 안에서 사용되어야 합니다.");
    return context
}