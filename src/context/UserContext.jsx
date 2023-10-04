import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

// Firebase

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { Box, CircularProgress } from "@mui/material";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return unsuscribe;
    });
    

    if (user === false)
        return (
            <>
                <Box
                    sx={{
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            </>
        );

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);
