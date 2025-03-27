import React from 'react';
import CategoryCreateForm from "@/app/admin/category/create/CategoryCreateForm";

const CategoryCreate = () => {
    return (
        <div className='w-full p-4'>
            <h1 className='text-2xl mb-4'>ایجاد دسته بندی جدید</h1>
            <CategoryCreateForm />
        </div>
    );
};

export default CategoryCreate;
