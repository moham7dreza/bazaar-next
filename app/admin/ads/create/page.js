import React from "react";
import AdCreateForm from "./AdCreateForm";

const AdCreatePage = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ایجاد آگهی جدید</h1>
      <AdCreateForm />
    </div>
  );
};

export default AdCreatePage;
