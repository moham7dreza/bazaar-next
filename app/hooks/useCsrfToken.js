import {useState} from "react";
import {useFetch} from "@/app/hooks/useFetch";

export const useCsrfToken = () => {
    const [csrfToken, setCsrfToken] = useState(null);
    const { fetchData, loading, error } = useFetch();

    const fetchCsrfToken = async () => {
        try {
            await fetchData('/sanctum/csrf-cookie', {
                method: 'GET',
            });

            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            if (token) {
                setCsrfToken(token);
            }
            return token;
        } catch (err) {
            console.error('Error fetching CSRF token:', err);
            throw err;
        }
    };

    return { csrfToken, fetchCsrfToken, loading, error };
};