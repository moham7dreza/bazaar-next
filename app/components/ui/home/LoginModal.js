'use client'
import React from 'react';
import {useAuth} from "@/app/contexts/AuthContext";

const LoginModal = ({onClose}) => {

    const [mobile, setMobile] = React.useState('');
    const [otp, setOtp] = React.useState('');
    // 1 mobile 2 opt code
    const [step, setStep] = React.useState(1);
    const [token, setToken] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);
    const [csrfToken, setCsrfToken] = React.useState('');

    const {login} = useAuth()

    function getCsrfToken() {
        if (typeof document === "undefined") return null;
        const cookies = document.cookie.split(";").map((c) => c.trim());
        for (const c of cookies) {
            if (c.startsWith("XSRF-TOKEN=")) {
                return decodeURIComponent(c.substring("XSRF-TOKEN=".length));
            }
        }
        return null;
    }

    const sendOtp = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
                credentials: "include",
            });
            setCsrfToken(getCsrfToken())

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-otp`,
                {
                    method: "POST",
                    headers: {
                        "X-XSRF-TOKEN": csrfToken || "",
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({mobile}),
                }
            );
            if (!response.ok) {
                setError('خطا در ارسال کد تایید')
                return;
            }

            const result = await response.json();

            setToken(result.data.token);
            setStep(2)
            setSuccess(result.meta.messages[0])
        } catch (e) {
            console.error(e)
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    const verifyOtp = async () => {
        if (!token) {
            setError("خطا در دریافت توکن");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
                credentials: "include",
            });
            setCsrfToken(getCsrfToken)

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
                {
                    method: "POST",
                    headers: {
                        "X-XSRF-TOKEN": csrfToken || "",
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        otp,
                        mobile,
                        token,
                    }),
                }
            );
            if (!response.ok) {
                setError('خطا در ارسال کد تایید')
                return;
            }

            const result = await response.json();

            if (response.ok) {
                await login(token)
                setSuccess(result.meta.messages[0])
                setTimeout(() => onClose(false), 1000)
            } else {
                setError('خطا در فرایند لاگین')
            }
        } catch (e) {
            console.error(e)
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className='fixed inset-0 !m-0 bg-gray-800/50 flex items-center justify-center z-[99999]'>
                <div className='bg-white rounded-lg p-9 w-96 max-h-96 overflow-y-auto'>
                    <div className='flex items-center justify-between mb-4'>
                        <h3 className='text-lg font-semibold text-red-500'>
                            {
                                step === 1 ? 'ورود یا ثبت نام' : 'تایید شماره موبایل'
                            }
                        </h3>
                        <button onClick={() => onClose()}>
                            <i className='fa fa-times'></i>
                        </button>
                    </div>
                    {
                        step === 1 && (
                            <div className="flex flex-col gap-4">
                                <input value={mobile} onChange={(e) => setMobile(e.target.value)}
                                       className="border border-gray-300 rounded-md p-2" type="text"
                                       placeholder="شماره موبایل"/>
                                <button className="bg-red-700 text-white rounded-md p-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={loading}
                                        onClick={sendOtp}>تایید
                                    شماره موبایل
                                </button>
                            </div>
                        )
                    }
                    {
                        step === 2 && (
                            <div className="flex flex-col gap-4">
                                <input value={otp} onChange={(e) => setOtp(e.target.value)}
                                       className="border border-gray-300 rounded-md p-2" type="text"
                                       placeholder="کد تایید"/>
                                <button className="bg-red-700 text-white rounded-md p-2" disabled={loading}
                                        onClick={verifyOtp}>تایید کد
                                </button>
                            </div>
                        )
                    }
                    <div className="mt-2">
                        {error && (
                            <div className="p-4 bg-red-100 border-red-400 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-4 bg-green-100 border-green-400 text-green-700 rounded-md">
                                {success}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginModal;
