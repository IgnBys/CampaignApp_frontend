import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


export const EmeraldContext = createContext();
export const useEmerald = () => useContext(EmeraldContext);

export const EmeraldProvider = ({ children }) => {
    const [emeraldBalance, setEmeraldBalance] = useState(0);

    const fetchEmeraldBalance = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/emerald-balance");
            setEmeraldBalance(response.data);
        } catch (error) {
            console.error("Error fetching emerald balance:", error);
        }
    };

    const updateEmeraldBalance = (newBalance) => {
        setEmeraldBalance(newBalance);
    };

    useEffect(() => {
        fetchEmeraldBalance();
    }, []);  

    return (
        <EmeraldContext.Provider value={{ emeraldBalance, fetchEmeraldBalance, updateEmeraldBalance }}>
            {children}
        </EmeraldContext.Provider>
    );
};
