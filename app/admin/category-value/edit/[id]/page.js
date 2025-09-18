import React from "react";
import CategoryValueEditForm from "./CategoryValueEditForm";

async function getCategoryValue(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/category-value/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("خطایی در دریافت اطلاعات");
  return res.json();
}

async function getCategoryAttributes() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/category-attribute`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "force-cache",
    }
  );
  if (!response.ok) throw new Error("خطایی در دریافت اطلاعات");

  return response.json();
}

const CategoryValueEditPage = async ({ params }) => {
  let { id } = await params;
  const categoryValue = await getCategoryValue(id);
  const categoryAttributes = await getCategoryAttributes();
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ویرایش منطقه </h1>
      <CategoryValueEditForm
        categoryValue={categoryValue.data}
        categoryAttributes={categoryAttributes.data}
      />
    </div>
  );
};

export default CategoryValueEditPage;
