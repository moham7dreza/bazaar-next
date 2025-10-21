'use client'
import React from 'react';
import LoginModal from "@/app/components/ui/home/LoginModal";
import {useAuth} from "@/app/contexts/AuthContext";

const AdRegisterButton = () => {
    const [showModal, setShowModal] = React.useState(false);
    const {user, logout} = useAuth();
    console.log(user);

    return (
        <>
            {
                user ?
                    (
                        <button onClick={logout}
                                className="flex justify-center items-center bg-red-700 text-white px-5 py-2 font-bold rounded">
                            خروج
                        </button>
                    )
                    :
                    (
                        <button onClick={() => setShowModal(true)}
                                className="flex justify-center items-center bg-red-700 text-white px-5 py-2 font-bold rounded">
                            ورود/ثبت نام
                        </button>
                    )
            }
            {
                showModal && <LoginModal onClose={() => setShowModal(false)}/>
            }
        </>
    );
};

export default AdRegisterButton;
