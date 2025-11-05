'use client'

import React, {useEffect, useState} from 'react';
import CategoryModal from "@/app/components/ui/home/CategoryModal";

const CategoryHeader = ({onCategoryChanged, selectedCategory}) => {
    const [categories, setCategories] = useState()

    useEffect(() => {
        const fetchData = async () => {
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
                const result = await res.json();
                setCategories(result);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
    }, [])

    return (
        <CategoryModal categories={categories} onCategoryChanged={onCategoryChanged} selectedCategory={selectedCategory} />
    );
};

export default CategoryHeader;
