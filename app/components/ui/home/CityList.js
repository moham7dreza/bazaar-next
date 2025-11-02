'use client'

import React, {useEffect, useState} from 'react';
import CityModal from "@/app/components/ui/home/CityModal";

const CityList = ({onCityChanged, selectedCity}) => {
    const [cities, setCities] = useState()

    useEffect(() => {
        const fetchData = async () => {
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
                const result = await res.json();
                setCities(result);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
    }, [])
    console.log(cities)
    return (
        <CityModal cities={cities} onCityChanged={onCityChanged} selectedCity={selectedCity}/>
    );
};

export default CityList;
