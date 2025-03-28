import React from "react";
import CategoryEditForm from "./CategoryEditForm";

async function getCategory(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertise/category/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("خطایی در دریافت دسته بندی ها");
  return res.json();
}

async function getCategroies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertise/category`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "force-cache",
    }
  );
  if (!response.ok) throw new Error("خطایی در دریافت دسته بندی ها");

  return response.json();
}

const CategoryEditPage = async ({ params }) => {
  const category = await getCategory(params.id);
  const categories = await getCategroies();
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ویرایش دسته بندی </h1>
      <CategoryEditForm category={category.data} categories={categories.data} />
    </div>
  );
};

export default CategoryEditPage;
