import React from "react";
import CategoryAttributeEditForm from "./CategoryAttributeEditForm";

async function getCategoryAttribute(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/category-attribute/${id}`,
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

async function getCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/category`,
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

const CategoryAttributeEditPage = async ({ params }) => {
  let { id } = await params;
  const categoryAttribute = await getCategoryAttribute(id);
  const categories = await getCategories();
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ویرایش ویژگی </h1>
      <CategoryAttributeEditForm
        categoryAttribute={categoryAttribute.data}
        categories={categories.data}
      />
    </div>
  );
};

export default CategoryAttributeEditPage;
