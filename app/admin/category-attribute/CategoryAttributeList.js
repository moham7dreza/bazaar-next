"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CategoryAttributeList = ({ categoryAttributes }) => {
  console.log(categoryAttributes);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const converterToJalali = (date) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      calender: "persian",
    };

    const jalaliDate = new Date(date).toLocaleDateString("fa-IR", options);
    return jalaliDate;
  };

  const handleDelete = async (id) => {
    if (!confirm("آیا از حذف اطمینان دارید؟")) {
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertise/state/${id}`,
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
          throw new Error("خطا در حذف");
        }
        setSuccess("با موفقیت حذف شد");
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
            <th className="border px-4 py-2 text-right">واحد</th>
            <th className="border px-4 py-2 text-right">دسته بندی</th>
            {/* <th className="border px-4 py-2 text-right">نوع</th> */}
            <th className="border px-4 py-2 text-right">وضعیت</th>
            <th className="border px-4 py-2 text-right">تاریخ</th>
            <th className="border px-4 py-2 text-right">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {categoryAttributes.data.map((categoryAttribute) => {
            return (
              <tr key={categoryAttribute.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-right">
                  {categoryAttribute.id}
                </td>
                <td className="border px-4 py-2 text-right">
                  {categoryAttribute.name}
                </td>
                <td className="border px-4 py-2 text-right">
                  {categoryAttribute.unit}
                </td>
                <td className="border px-4 py-2 text-right">
                  {categoryAttribute.category.name}
                </td>
                {/* <td className="border px-4 py-2 text-right">
                  {categoryAttribute.type ? "فعال" : "غیرفعال"}
                </td> */}
                <td className="border px-4 py-2 text-right">
                  {categoryAttribute.status ? "فعال" : "غیرفعال"}
                </td>
                <td className="border px-4 py-2 text-right">
                  {converterToJalali(categoryAttribute.created_at)}
                </td>
                <td className="border px-4 py-2 text-right">
                  <Link
                    href={`/admin/state/edit/${categoryAttribute.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                  >
                    <i className="fa fa-edit"></i>
                  </Link>
                  <button
                    onClick={() => handleDelete(categoryAttribute.id)}
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

export default CategoryAttributeList;
