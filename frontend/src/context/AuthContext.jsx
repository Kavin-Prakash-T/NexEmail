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
        const normalizedUser = userData?.user
            ? { ...userData.user, token: userData.token }
            : userData

        localStorage.setItem("userInfo", JSON.stringify(normalizedUser))
        localStorage.setItem("token", normalizedUser.token)
        setUser(normalizedUser)
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