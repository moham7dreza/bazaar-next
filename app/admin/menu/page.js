import React from "react";
import Link from "next/link";
import {apiGet} from "@/app/lib/fetchUtils";
import MenuList from "@/app/admin/menu/MenuList";

const MenuPage = async () => {

    // const result = await apiGet('/api/admin/content/menu');

    let menus;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/menu`,
            {
                headers: {
                    Accept: "application/json",
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("خطا در دریافت اطلاعات");
        }

        menus = await res.json();

        if (!menus.status) {
            throw new Error("خطا در دریافت اطلاعات");
        }
    } catch (err) {
        console.error(err);
    }

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl mb-4">لیست منو ها</h1>

            <div>
                <Link
                    href={"/admin/menu/create"}
                    className="bg-blue-500 text-white px-4 py-2 inline-block rounded-md hover:bg-blue-600 mb-4"
                >
                    ساخت
                </Link>
            </div>

            <MenuList menus={menus}/>
        </div>
    );
};

export default MenuPage;
