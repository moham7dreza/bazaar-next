'use client'

import {createContext, useCallback, useContext, useEffect, useState} from "react";

const AuthContext = createContext({
    user: null,
    loading: false,
    login: async () => {
    },
    logout: async () => {
    },
    refreshUser: async () => {
    },
})

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(0)

    const refreshUser = useCallback(() => setRefresh(prev => prev + 1), [])

    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            }
        }).then(res => res.ok ? res.json() : null)
            .then(data => {
                setUser(data && data.id ? data : null)
                setLoading(false)
            }).catch(error => {
            console.error(error)
            setLoading(false)
            setUser(null)
        })
    }, [refresh]);

    const login = useCallback(async (token) => {
        await fetch('/api/set-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token})
        })
        refreshUser()
    }, [refreshUser])

    function getCsrfToken() {
        if (typeof document !== 'undefined') return null

        const cookies = document.cookie.split(';').map(cookie => cookie.trim());

        for (const cookie of cookies) {
            if (cookie.startsWith('XSRF-TOKEN=')) {
                return decodeURIComponent(
                    cookie.substring('XSRF-TOKEN='.length)
                )
            }
        }
        return null
    }

    return (
        <AuthContext.Provider value={
            {user, loading, login, refreshUser}
        }>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)