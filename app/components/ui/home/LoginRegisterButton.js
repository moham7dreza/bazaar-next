'use client'
import React from 'react';
import LoginModal from "@/app/components/ui/home/LoginModal";

const AdRegisterButton = () => {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}
                    className="flex justify-center items-center bg-red-700 text-white px-5 py-2 font-bold rounded">
                ثبت نام
            </button>
            {
                showModal && <LoginModal onClose={() => setShowModal(false)}/>
            }
        </>
    );
};

export default AdRegisterButton;
