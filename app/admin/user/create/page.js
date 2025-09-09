import React from "react";
import UserCreateForm from "./UserCreateForm";

const UserCreatePage = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ایجاد کاربر جدید</h1>
      <UserCreateForm />
    </div>
  );
};

export default UserCreatePage;
