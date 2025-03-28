import React from "react";
import Link from "next/link";
import {apiGet} from "@/app/lib/fetchUtils";

const MenuPage = async () => {
    let menus;

    const result = await apiGet('/api/admin/content/menu');

    menus = result.data

    console.log(menus)
    return (
        <div className="w-full p-4">
            <h1 className="text-2xl mb-4">لیست دسته بندی ها</h1>

            <div>
                <Link
                    href={"/admin/menu/create"}
                    className="bg-blue-500 text-white px-4 py-2 inline-block rounded-md hover:bg-blue-600 mb-4"
                >
                    ساخت
                </Link>
            </div>
        </div>
    );
};

export default MenuPage;
