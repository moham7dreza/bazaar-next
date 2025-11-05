'use client'

import React, {useEffect, useMemo, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useFilters} from "@/app/contexts/FilterProvider";

const AdvertisementList = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [loading, setLoading] = useState(false);
    const {filters} = useFilters()

    const converterToJalali = (date) => {
        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            calendar: "persian",
        };

        return new Date(date).toLocaleTimeString("fa-IR", options);
    };

    useEffect(() => {
        setLoading(true);
        const fetchAds = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/advertisements`, {
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
                setAdvertisements(result.data)
                setLoading(false);
            } catch (e) {
                console.error(e);
            }
        }
        fetchAds();
    }, [])

    const filteredAdvertisements = useMemo(() => {
        return advertisements.filter(advertisement => {
            if (filters.city && advertisement.city?.name !== filters.city) {
                return false;
            }
            if (filters.category && advertisement.category?.name !== filters.category) {
                return false;
            }
            if (filters.phrase && ! advertisement.title.toLocaleLowerCase().includes(filters.phrase.toLowerCase())) {
                return false;
            }
            return true;
        })
    }, [advertisements, filters])

    if (loading) {
        return (
            <div className='text-red-500'>در حال دریافت آگهی</div>
        )
    }

    return (
        <>
            {
                filteredAdvertisements.map((ad, index) => (
                    <article key={index} className="w-full md:w-1/2 xl:w-1/3">
                        <Link href={`/ads/${ad.id}`}>
                            <div className="border flex justify-between p-3 rounded m-2">
                                <section>
                                    <div className="mb-8">
                                        <h6>{ad.title}</h6>
                                    </div>
                                    <div className="mb-1 text-sm text-gray-500">
                                        <h6>{ad.category.name}</h6>
                                    </div>
                                    <div className="mb-1 text-sm text-gray-500">
                                        <h6>
                                            {
                                                ad.price ? parseFloat(ad.price).toLocaleString("fa-IR") + ' تومان' : 'توافقی'
                                            }
                                        </h6>
                                    </div>
                                    <div className="mb-1 text-sm text-gray-500 flex space-x-1 space-x-reverse">
                                        <h6 className="text-red-700">{ad.is_special ? "ویژه" : ""}</h6>
                                        <h6>{converterToJalali(ad.created_at)}</h6>
                                    </div>
                                </section>

                                <section>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/${ad.image?.indexArray.medium}`}
                                        width={130}
                                        height={130}
                                        alt="ads"
                                    />
                                </section>
                            </div>
                        </Link>
                    </article>
                ))
            }
        </>
    );
};

export default AdvertisementList;
