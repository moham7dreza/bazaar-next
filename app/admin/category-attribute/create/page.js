import React from "react";
import StateCreateForm from "./StateCreateForm";

const StateCreatePage = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ایجاد منطقه جدید</h1>
      <StateCreateForm />
    </div>
  );
};

export default StateCreatePage;
