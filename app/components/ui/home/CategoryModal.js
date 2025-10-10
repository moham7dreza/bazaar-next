'use client'
import React from 'react';

const CategoryModal = ({categories}) => {
    const [showModal, setShowModal] = React.useState(false);
    // use selected category
    const [selectedCategory, setSelectedCategory] = React.useState('انتخاب دسته بندی');

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setShowModal(false);
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}
                className="flex justify-center items-center space-x-3 space-x-reverse text-gray-500 hover:text-blue-600 transition-colors"
            >
                <p>{selectedCategory}</p>
                <i className="fa fa-angle-down text-xl text-gray-500"></i>
            </button>
            {
                showModal && (
                    <div className='fixed inset-0 bg-black bg-opacategory-50 flex items-center justify-center z-[99999]'>
                        <div className='bg-white rounded-lg p-9 w-96 max-h-96 overflow-y-auto'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className='text-lg font-semibold'>
                                    انتخاب دسته بندی
                                </h3>
                                <button onClick={() => setShowModal(false)}>
                                    <i className='fa fa-times'></i>
                                </button>
                            </div>
                            <div className="space-y-2">
                                {
                                    categories?.data.map((category, index) => (
                                        <div key={index} className="">
                                            <button onClick={() => handleCategorySelect(category.name)}
                                                className="w-full text-right py-2 px-3 hover:bg-gray-100 text-sm flex items-center space-x-reverse space-x-2"
                                            >
                                                <i className={category.icon}></i>
                                                <p>{category.name}</p>
                                            </button>
                                            {
                                                category.children && (
                                                    <div className="mr-6 space-y-1">
                                                        {(
                                                            () => {
                                                                try {
                                                                    const children = typeof category.children === 'string' ? JSON.parse(category.children) : category.children;

                                                                    if (Array.isArray(children) && children.length > 0) {
                                                                        return children.map((child, index) => (
                                                                            <button key={index} className="w-full text-right py-2 px-3 rounded transition-colors hover:bg-gray-100 text-sm flex items-center space-x-reverse space-x-2"
                                                                                onClick={() => handleCategorySelect(child.name)}
                                                                            >
                                                                                <i className={child.icon}></i>
                                                                                <p>{child.name}</p>
                                                                            </button>
                                                                        ))
                                                                    }
                                                                    return null;
                                                                } catch (e) {
                                                                    console.error(e)
                                                                }
                                                            }
                                                        )}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default CategoryModal;
