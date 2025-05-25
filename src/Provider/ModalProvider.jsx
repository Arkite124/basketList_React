import {createContext, useState, useContext} from "react";
import {Dialog} from "@headlessui/react";

const ModalContext=createContext(null);

export function ModalProvider({ children }){
    const [isOpen,setIsOpen]=useState(false)
    const [modalContent,setModalContent]=useState(<></>)
    const [modalTitle,setModalTitle]=useState("")

    const openModal=(title,content) => {
        setModalTitle(title)
        setModalContent(content)
        setIsOpen(true)}
    const closeModal = () =>{
        setModalTitle("")
        setIsOpen(false);
        setModalContent(null);
    }

    return (
        <ModalContext.Provider value={{isOpen, openModal, closeModal,modalTitle,modalContent}}>
            {isOpen &&
            <Dialog open={isOpen} onClose={closeModal} className="z-50"> {/*모달 컴포넌트 우선순위 Z-index:50설정*/}
            <div className="fixed inset-0 bg-black bg-opacity-40" aria-hidden="true"> {/*모달 컴포넌트 바깥 배경 투명도 40설정*/}
                <div className="fixed inset-0 flex h-[50rem] items-center justify-center p-[0.3rem]">{/*모달 안쪽 컴포넌트들 가운데로 정렬, 전체 패딩 3%*/}
                    <Dialog.Panel className="relative top-0 h-[25rem] bg-white rounded-md p-[1rem]
                     min-w-sm max-w-lg w-3/4 shadow-gray-700-lg flex flex-col items-center">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 border-transparent hover:text-gray-700"
                        >
                            X
                        </button>
                        <Dialog.Title className="flex text-3xl text-black font-mono text-blue-900 pb-3 items-center justify-center w-full
                        border-b-2 border-gray-500">{modalTitle}</Dialog.Title>
                        <img src="/alert_icon.png" alt="주의!" className="w-[10rem] h-[10rem]"/>
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