import React from 'react';
import StateModal from "@/app/components/ui/home/StateModal";

const StateList = async () => {
    let states;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/states`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) {
            throw new Error('خطا در دریافت اطلاعات')
        }
        states = await res.json();
    } catch (e) {
        console.error(e);
        return (
            <div className='text-red-500'>خطا در دریافت محل ها</div>
        )
    }

    return (
        <StateModal states={states} />
    );
};

export default StateList;
