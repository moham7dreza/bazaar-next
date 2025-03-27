import React from "react";
import CategoryList from "./CategoryList";
import Link from "next/link";

const CategoryPage = async () => {
  let categories;

  try {
    const res = await fetch(
      `http://bazaar-laravel.test/api/admin/advertise/category`,
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

    categories = await res.json();

    if (!categories.status) {
      throw new Error("خطا در دریافت اطلاعات");
    }
      // console.log(categories)
  } catch (err) {
    console.log(err);
  }
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">لیست دسته بندی ها</h1>

      <div>
        <Link href='/admin/category/create' className="bg-blue-500 text-white px-4 py-2 inline-block rounded-md hover:bg-blue-600 mb-4">
          ساخت
        </Link>
      </div>
      <CategoryList categories={categories} />
    </div>
  );
};

export default CategoryPage;
