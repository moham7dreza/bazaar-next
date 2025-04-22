import React from "react";
import PageCreateForm from "./PageCreateForm";

const PageCreatePage = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ایجاد صفحه جدید</h1>
      <PageCreateForm />
    </div>
  );
};

export default PageCreatePage;
