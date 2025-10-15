import React from 'react';
import Image from "next/image";
import Link from "next/link";

const AdvertisementList = async () => {
    let advertisements;
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
        advertisements = await res.json();
    } catch (e) {
        console.error(e);
        return (
            <div className='text-red-500'>خطا در دریافت آگهی</div>
        )
    }

    return (
        <>
            {
                advertisements?.data.map((ad, index) => (
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
                                        <h6>{parseFloat(ad.price).toLocaleString("fa-IR") + ' تومان'}</h6>
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
