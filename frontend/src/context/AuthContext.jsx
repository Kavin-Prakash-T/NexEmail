import React, { createContext, useState } from 'react'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const userInfo = localStorage.getItem("userInfo")

        if (!userInfo) {
            return null
        }

        try {
            return JSON.parse(userInfo)
        } catch {
            localStorage.removeItem("userInfo")
            localStorage.removeItem("token")
            return null
        }
    })

    const login = (userData) => {
        localStorage.setItem("userInfo", JSON.stringify(userData))
        localStorage.setItem("token", userData.token)
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("userInfo")
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading: false, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }
export default AuthProvider