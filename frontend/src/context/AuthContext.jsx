import React, { useEffect } from 'react'
import { useState } from 'react'

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo")
        if (userInfo) {
            try {
                setUser(JSON.parse(juserInfo))
            } catch (error) {
                localStorage.removeItem("userInfo");
                localStorage.removeItem("token")
            }
        }
        setLoading(false)
    }, [])

    const login = (userData) => {
        localStorage.setItem("userInfo", JSON.stringify(userData))
        localStorage.setItem("token", userData.token);
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem("userInfo")
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext