import React from "react";
import CategoryCreateForm from "./CategoryCreateForm";

const CategoryCreatePage = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ایجاد دسته بندی جدید</h1>
      <CategoryCreateForm />
    </div>
  );
};

export default CategoryCreatePage;
