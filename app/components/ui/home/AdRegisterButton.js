'use client'
import React from 'react';
import Link from "next/link";
import {useAuth} from "@/app/contexts/AuthContext";

const AdRegisterButton = () => {
    const {user} = useAuth();
    return (
        <div>
            {
                user && (
                    <Link href="/admin" className="flex justify-center items-center bg-red-700 text-white px-5 py-2 font-bold rounded">
                        ثبت آگهی
                    </Link>
                )
            }
        </div>
    );
};

export default AdRegisterButton;
