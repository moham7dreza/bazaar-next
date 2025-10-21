"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

const AuthContext = createContext({
    user: null,
    loading: true,
    login: async () => {},
    logout: async () => {},
    refreshUser: async () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);

    const refreshUser = useCallback(() => setRefresh((prev) => prev + 1), []);

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
            credentials: "include",
            headers: {
                Accept: "application/json",
            },
        }).then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                setUser(data && data.id ? data : null);
                setLoading(false);
            }).catch((err) => {
                console.error("Error fetching user:", err);
            setLoading(false);
            setUser(null);
            });
    }, [refresh]);

    const login = useCallback(async (token) => {
            await fetch("/api/set-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });
            refreshUser();
        }, [refreshUser]);

    function getCsrfToken() {
        if (typeof document === "undefined") return null;

        const cookies = document.cookie.split(";").map((c) => c.trim());

        for (const c of cookies) {
            if (c.startsWith("XSRF-TOKEN=")) {
                return decodeURIComponent(
                    c.substring("XSRF-TOKEN=".length)
                );
            }
        }
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};