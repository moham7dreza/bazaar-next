// Helper to parse cookies (works in both server and client)
const parseCookies = () => {
    if (typeof window === 'undefined') {
        // Server-side
        const { cookies } = require('next/headers');
        const allCookies = cookies().getAll();
        return allCookies.reduce((acc, cookie) => {
            acc[cookie.name] = cookie.value;
            return acc;
        }, {});
    } else {
        // Client-side
        return document.cookie.split('; ').reduce((acc, cookie) => {
            const [name, value] = cookie.split('=');
            acc[name] = value;
            return acc;
        }, {});
    }
};

export const fetchCsrfToken = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
            {
                method: "GET",
                credentials: "include",
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch CSRF token: ${response.status}`);
        }

        // Get token from cookies
        const cookies = parseCookies();
        const token = cookies['XSRF-TOKEN'];

        return token;
    } catch (err) {
        console.error("Error fetching CSRF token:", err);
        throw err;
    }
};

// Generic fetch wrapper
export const apiFetch = async (url, options = {}) => {
    const headers = new Headers(options.headers || {});

    // Add CSRF token if available
    // const cookies = parseCookies();
    // if (cookies['XSRF-TOKEN']) {
    //     headers.set('X-XSRF-TOKEN', cookies['XSRF-TOKEN']);
    // }

    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        headers,
        credentials: 'include',
        cache: 'no-store',
    });
    // console.log(response)
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Request failed');
    }

    return response.json();
};

// Convenience methods
export const apiGet = (url) => apiFetch(url, { method: 'GET' });
export const apiPost = (url, body) => apiFetch(url, {
    method: 'POST',
    body: JSON.stringify(body)
});
export const apiPut = (url, body) => apiFetch(url, {
    method: 'PUT',
    body: JSON.stringify(body)
});
export const apiDelete = (url) => apiFetch(url, { method: 'DELETE' });