import { ToastContainer, toast } from "react-toastify";
import React from 'react'

export const notify = (message) => {
    toast.error(message, { position: "top-center",theme: "colored" })
}
const Toast = () => {
    return (
        <>
            <ToastContainer/>
        </>
    )
}

export default Toast
