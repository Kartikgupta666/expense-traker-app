import { ToastContainer, toast } from "react-toastify";
import React from 'react'

const Toast = () => {
    const notify = () => {
        toast("this is the test")
    }
    return (
        <>
            <button onClick={notify}>
                <ToastContainer />
            </button>

        </>
    )
}

export default Toast
