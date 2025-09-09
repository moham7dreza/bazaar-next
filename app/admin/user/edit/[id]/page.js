import React from "react";
import UserEditForm from "./UserEditForm";

async function getUser(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/user/${id}`,
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

const UserEditPage = async ({ params }) => {
  let { id } = await params;
  const user = await getUser(id);
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ویرایش منو </h1>
      <UserEditForm user={user.data} />
    </div>
  );
};

export default UserEditPage;
