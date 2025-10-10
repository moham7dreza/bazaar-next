import React from 'react';
import CategoryModal from "@/app/components/ui/home/CategoryModal";

const CategoryHeader = async () => {
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
        <CategoryModal categories={categories}/>
    );
};

export default CategoryHeader;
