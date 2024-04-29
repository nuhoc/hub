import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal'
import { createContext, useContext, useState } from "react";
import type { ModalContextProps, ModalInfo } from "../types";

const ModalContext = createContext<null | ModalInfo>(null);

export const ModalProvider = ({ children }: ModalContextProps) => {
    const [open, setOpen] = useState(false);

    const onCloseModal = () => setOpen(false);

    const [info, setModalInfo] = useState(<div></div>)
    const addInfo = (newInfo: JSX.Element) => setModalInfo(newInfo)
    const removeInfo = () => setModalInfo(<div></div>)

    const contextValue = {
        info,
        open,
        setOpen,
        addInfo,
        removeInfo,
    };

    return <ModalContext.Provider value={contextValue}>
        <Modal open={open} onClose={onCloseModal} center classNames={{ modal: "rounded-lg" }}>
            <div className=" pt-10 p-4 rounded-lg flex flex-col gap-4">
                {info}
                <button className=" self-end" onClick={onCloseModal}>Dismiss</button>
            </div>
        </Modal>
        {children}
    </ModalContext.Provider>
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("ModalContext must be used within a ModalProvider");
    }
    const { info, open, setOpen, addInfo, removeInfo } = context;

    return { info, open, setOpen, addInfo, removeInfo };
};