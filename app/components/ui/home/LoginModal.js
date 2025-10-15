'use client'
import React from 'react';

const LoginModal = ({onClose}) => {

    const [mobile, setMobile] = React.useState('');
    const [otp, setOtp] = React.useState('');
    // 1 mobile 2 opt code
    const [step, setStep] = React.useState(1);
    const [token, setToken] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');

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
                                <input className="border border-gray-300 rounded-md p-2" type="text" placeholder="شماره موبایل"/>
                                <button className="bg-red-700 text-white rounded-md p-2" onClick={() => setStep(2)}>تایید شماره موبایل</button>
                            </div>
                        )
                    }
                    {
                        step === 2 && (
                            <div className="flex flex-col gap-4">
                                <input type="text" placeholder="کد تایید"/>
                                <button onClick={() => setStep(3)}>تایید کد</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default LoginModal;
