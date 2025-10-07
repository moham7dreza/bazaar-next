import React from 'react';

const CategoryList = async () => {
    let categories;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) {
            throw new Error('خطا در دریافت اطلاعات')
        }
        categories = await res.json();
    } catch (e) {
        console.error(e);
        return (
            <div className='text-red-500'>خطا در دریافت دسته بندی</div>
        )
    }

    return (
        <div>
            <section className="space-y-5">
                {
                    categories?.data.map((category, index) => (
                        <div key={index} className="flex items-center space-x-reverse space-x-2 text-gray-600">
                            <i className={category.icon}></i>
                            <p>{category.name}</p>
                        </div>
                    ))
                }
            </section>
        </div>
    );
};

export default CategoryList;
