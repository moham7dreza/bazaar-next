"use client";
import React from "react";

const CategoryList = ({ categories }) => {
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

  return (
    <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-right">شناسه</th>
          <th className="border px-4 py-2 text-right">نام</th>
          <th className="border px-4 py-2 text-right">توضیحات</th>
          <th className="border px-4 py-2 text-right">وضعیت</th>
          <th className="border px-4 py-2 text-right">تاریخ</th>
          <th className="border px-4 py-2 text-right">عملیات</th>
        </tr>
      </thead>

      <tbody>
        {categories.data.map((category) => {
          return (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-right">{category.id}</td>
              <td className="border px-4 py-2 text-right">{category.name}</td>
              <td className="border px-4 py-2 text-right">
                {category.description}
              </td>
              <td className="border px-4 py-2 text-right">
                {category.status ? "فعال" : "غیرفعال"}
              </td>
              <td className="border px-4 py-2 text-right">
                {converterToJalali(category.created_at)}
              </td>
              <td className="border px-4 py-2 text-right">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
                  <i className="fa fa-edit"></i>
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CategoryList;
