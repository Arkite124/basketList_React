import {createContext, useState, useContext} from "react";
import {Dialog} from "@headlessui/react";

const ModalContext=createContext(null);

export function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<div></div>);
    const [modalTitle, setModalTitle] = useState("");
    const [isReady, setIsModalReady] = useState(false);

    const openModal = (title, content) => {
        setModalTitle(title);
        setModalContent(content);
        setIsModalReady(true);

        // 모달 내용 반영 후 모달을 한 프레임 뒤에 띄움
        setTimeout(() => setIsOpen(true), 0);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalTitle("");
        setModalContent(<div></div>);
        setIsModalReady(false);
    };

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalTitle, modalContent }}>
            {isOpen && isReady && (
                <Dialog open={isOpen} onClose={closeModal} className="z-50">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40"
                        aria-hidden="true"
                    >
                        <div className="fixed inset-0 flex h-[50rem] items-center justify-center p-[0.3rem] bg-green-300/10">
                            <Dialog.Panel
                                className="relative top-0 h-[25rem] bg-white rounded-md p-[1rem]
                 min-w-sm max-w-lg w-3/4 shadow-gray-700-lg flex flex-col items-center"
                            >
                                <button
                                    onClick={closeModal}
                                    className="absolute top-2 right-2 text-gray-500 border-transparent hover:text-gray-700"
                                >
                                    X
                                </button>
                                <Dialog.Title
                                    className="flex flex-col text-3xl text-black font-mono text-blue-900 pb-3 items-center justify-center w-full"
                                >
                                    {modalTitle}
                                </Dialog.Title>
                                {modalContent}
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            )}
            {children}
        </ModalContext.Provider>
    );
}

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context)
        throw new Error("모달은 ModalProvider 안에서 사용되어야 합니다.");
    return context;
};