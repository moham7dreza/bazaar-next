"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {converterToJalali} from "@/app/lib/timeUtils";

const MenuList = ({ menus }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const getParentName = (parentId) => {
    const parent = menus.data.find((item) => item.id === parentId);
    return parent ? parent.name : "منو اصلی";
  };

  const handleDelete = async (id) => {
    if (!confirm("آیا از حذف این منو اطمینان دارید؟")) {
      return;
    }

    setLoading(id);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      console.log(`وضعیت توکن`, response.status);

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];
      if (token) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/menu/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-CSRF-TOKEN": token,
            },
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("خطا در حذف منو");
        }
        setSuccess("منو با موفقیت حذف شد");
        setTimeout(() => {
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-right">شناسه</th>
            <th className="border px-4 py-2 text-right">نام</th>
            <th className="border px-4 py-2 text-right">منوی والد</th>
            <th className="border px-4 py-2 text-right">ادرس</th>
            <th className="border px-4 py-2 text-right">وضعیت</th>
            <th className="border px-4 py-2 text-right">تاریخ</th>
            <th className="border px-4 py-2 text-right">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {menus?.data.map((menu) => {
            return (
              <tr key={menu.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-right">{menu.id}</td>
                <td className="border px-4 py-2 text-right">{menu.title}</td>
                <td className="border px-4 py-2 text-right">
                  {getParentName(menu.parent_id)}
                </td>
                <td className="border px-4 py-2 text-center">
                  <Link dir='ltr' href={menu.url}>{menu.url}</Link>
                </td>
                <td className="border px-4 py-2 text-right">
                  {menu.status ? "فعال" : "غیرفعال"}
                </td>
                <td className="border px-4 py-2 text-right">
                  {converterToJalali(menu.created_at)}
                </td>
                <td className="border px-4 py-2 text-right">
                  <Link
                    href={`/admin/menu/edit/${menu.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                  >
                    <i className="fa fa-edit"></i>
                  </Link>
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {error && <div className="text-red-500 text-center my-4">{error}</div>}
      {success && (
        <div className="bg-green-300 text-3xl text-green-800 py-3 rounded-lg text-center my-4">
          {success}
        </div>
      )}
    </div>
  );
};

export default MenuList;
