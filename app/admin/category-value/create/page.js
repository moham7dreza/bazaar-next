import React from "react";
import CategoryValueCreateForm from "./CategoryValueCreateForm";

const CategoryValueCreatePage = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ایجاد مقدار جدید</h1>
      <CategoryValueCreateForm />
    </div>
  );
};

export default CategoryValueCreatePage;
