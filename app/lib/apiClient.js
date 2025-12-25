/**
 * Centralized API Client
 * Handles all HTTP requests with automatic CSRF token management
 */
'use client';
import React from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Get CSRF token from cookies
 */
const getCsrfToken = () => {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';').map(c => c.trim());
  const csrfCookie = cookies.find(c => c.startsWith('XSRF-TOKEN='));

  if (csrfCookie) {
    return decodeURIComponent(csrfCookie.substring('XSRF-TOKEN='.length));
  }

  return null;
};

/**
 * Fetch CSRF cookie from server
 */
const fetchCsrfCookie = async () => {
  try {
    await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
    });
    return getCsrfToken();
  } catch (error) {
    console.error('Failed to fetch CSRF cookie:', error);
    throw new Error('خطا در دریافت توکن امنیتی');
  }
};

/**
 * Base request function
 */
const request = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    body,
    headers = {},
    requiresAuth = true,
    ...restOptions
  } = options;

  // Build headers
  const requestHeaders = {
    'Accept': 'application/json',
    ...headers,
  };

  // Add Content-Type for non-FormData bodies
  if (body && !(body instanceof FormData)) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  // Add CSRF token for state-changing methods
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) {
    let csrfToken = getCsrfToken();

    // If no token exists, fetch it
    if (!csrfToken) {
      csrfToken = await fetchCsrfCookie();
    }

    if (csrfToken) {
      requestHeaders['X-XSRF-TOKEN'] = csrfToken;
    }
  }

  // Build request config
  const config = {
    method,
    headers: requestHeaders,
    credentials: 'include',
    ...restOptions,
  };

  // Add body if present
  if (body) {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  // Make request
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, config);

  // Handle response
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `خطا: ${response.status}`);
  }

  // Parse JSON response
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return response;
};

/**
 * API Client with convenience methods
 */
export const apiClient = {
  get: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: 'GET' }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: 'POST', body }),

  put: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: 'PUT', body }),

  patch: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: 'PATCH', body }),

  delete: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: 'DELETE' }),
};

/**
 * Hook for API calls with loading and error states
 */
export const useApi = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const execute = async (apiCall) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      setError(err.message || 'خطای غیرمنتظره');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, setError };
};

export default apiClient;

