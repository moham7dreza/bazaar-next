'use client'
import React, {useEffect, useState} from 'react';

const CategoryCreateForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState(false)
    const [icon, setIcon] = useState('')
    const [parentId, setParentId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [csrfToken, setCsrfToken] = useState(null)

    useEffect(() => {

        const fetchCsrfToken = async () => {
            try {
                const res = await fetch(
                    `http://bazaar-laravel.test/sanctum/csrf-cookie`,
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                )

                console.log(res.status, document.cookie.split('; '))

                const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN'))?.split('=')[1];
                console.log(token)

                if (token) {
                    setCsrfToken(token)
                }
            } catch (err) {
                setError('Failed to fetch CSRF token.')
                console.error(err)
            }
        }
        fetchCsrfToken();
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default CategoryCreateForm;
