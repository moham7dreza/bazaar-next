import React from 'react';
import CityModal from "@/app/components/ui/home/CityModal";

const CityList = async () => {
    let cities;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cities`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) {
            throw new Error('خطا در دریافت اطلاعات')
        }
        cities = await res.json();
    } catch (e) {
        console.error(e);
        return (
            <div className='text-red-500'>خطا در دریافت شهر ها</div>
        )
    }

    return (
        <CityModal cities={cities} />
    );
};

export default CityList;
