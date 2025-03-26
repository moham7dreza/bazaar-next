import React from 'react';
import CategoryIndex from "@/app/admin/category/CategoryIndex";

const Category = async () => {

    let categories;

    try {
        const result = await fetch(
            'http://bazaar-laravel.test/api/admin/advertise/category',
            {
                headers: {
                    'Accept': 'application/json'
                },
                cache: 'no-store'
            }
        )

        if (!result.ok) {
            console.error('failed to get category')
        }
        categories = await result.json()

        if (!categories.status) {
            console.error('failed to get category')
        }
    } catch (err) {
        console.error(err)
    }

    return (
        <div>
            <CategoryIndex categories={categories} />
        </div>
    );
};

export default CategoryIndex;
