import React from "react";
import CategoryAttributeCreateForm from "./CategoryAttributeCreateForm";

const CategoryAttributeCreatePage = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ایجاد ویژگی جدید</h1>
      <CategoryAttributeCreateForm />
    </div>
  );
};

export default CategoryAttributeCreatePage;
