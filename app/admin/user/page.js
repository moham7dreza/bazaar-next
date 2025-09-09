import React from "react";
import Link from "next/link";
import UserList from "./UserList";

const UserPage = async () => {
  let users;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/user`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("خطا در دریافت اطلاعات");
    }

    users = await res.json();

    if (!users.status) {
      throw new Error("خطا در دریافت اطلاعات");
    }
  } catch (err) {
    console.log(err);
  }
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">لیست کاربران</h1>

      <div>
        <Link
          href={"/admin/user/create"}
          className="bg-blue-500 text-white px-4 py-2 inline-block rounded-md hover:bg-blue-600 mb-4"
        >
          ساخت
        </Link>
      </div>
      <UserList users={users} />
    </div>
  );
};

export default UserPage;
