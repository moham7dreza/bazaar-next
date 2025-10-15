'use client'
import React from 'react';
import Link from "next/link";

const AdRegisterButton = () => {
    return (
        <div>
            <Link href="/admin" className="flex justify-center items-center bg-red-700 text-white px-5 py-2 font-bold rounded">
                ثبت آگهی
            </Link>
        </div>
    );
};

export default AdRegisterButton;
