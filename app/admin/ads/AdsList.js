"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AdsList = ({ ads }) => {
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/advertisement/${id}`,
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
            <th className="border px-4 py-2 text-right">عنوان</th>
            <th className="border px-4 py-2 text-right">تاریخ</th>
            <th className="border px-4 py-2 text-right">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {ads?.data.map((ad) => {
            return (
              <tr key={ad.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-right">{ad.id}</td>
                <td className="border px-4 py-2 text-right">{ad.title}</td>
                <td className="border px-4 py-2 text-right">
                  {converterToJalali(ad.created_at)}
                </td>
                <td className="border px-4 py-2 text-right">
                  <Link
                    href={`/admin/ads/edit/${ad.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                  >
                    <i className="fa fa-edit"></i>
                  </Link>
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <i className="fa fa-trash"></i>
                  </button>{" "}
                  <Link
                    href={`/admin/ads/show/${ad.id}`}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2"
                  >
                    <i className="fa fa-eye"></i>
                  </Link>
                    <Link
                    href={`/admin/ads/${ad.id}/gallery`}
                    className="bg-green-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mx-2"
                  >
                    <i className="fa fa-photo"></i>
                  </Link>
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

export default AdsList;
