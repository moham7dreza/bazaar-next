import React from "react";
import MenuCreateForm from "./MenuCreateForm";

const MenuCreatePage = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ایجاد دسته بندی جدید</h1>
      <MenuCreateForm />
    </div>
  );
};

export default MenuCreatePage;
