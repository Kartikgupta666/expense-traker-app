import { createContext, useContext, useEffect, useState } from "react"
import { fetchUser } from "../Backend/Auth";
const MainContext = createContext();

export const ContextProvider = ({ children }) => {
    const [Email, SetEmail] = useState('')
    useEffect(() => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            const getUser = async () => {
                const data = await fetchUser(); // Await the function if it returns a Promise
                SetEmail(data);
            };
            getUser();
        }
    }, [])

    return (
        <MainContext.Provider value={Email} >
            {children}
        </MainContext.Provider>
    )
}

export const useUserDetails = () => useContext(MainContext);