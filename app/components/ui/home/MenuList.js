import React from 'react';

const MenuList = async () => {
    let menus;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menus`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) {
            throw new Error('خطا در دریافت اطلاعات')
        }
        menus = await res.json();
    } catch (e) {
        console.error(e);
        return (
            <div className='text-red-500'>خطا در دریافت منوها</div>
        )
    }

    return (
        <div>
            <ul className="flex flex-wrap space-x-4 space-x-reverse  space-y-4 space-y-reverse">
                {
                    menus?.data.map((menu, index) => (
                        <li key={index} className="mx-1">
                            <a href={menu.url} className="text-sm text-gray-500">
                                <div className="flex items-center space-x-reverse space-x-2 text-gray-600">
                                    <i className={menu.icon}></i>
                                    <p>{menu.title}</p>
                                </div>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default MenuList;
