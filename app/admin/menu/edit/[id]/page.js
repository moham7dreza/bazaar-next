import React from "react";
import MenuEditForm from "./MenuEditForm";

async function getMenu(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/menu/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("خطایی در دریافت منو");
  return res.json();
}

async function getMenus() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/menu`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "force-cache",
    }
  );
  if (!response.ok) throw new Error("خطایی در دریافت منو ها");

  return response.json();
}

const MenuEditPage = async ({ params }) => {
  const menu = await getMenu(params.id);
  const menus = await getMenus();
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ویرایش منو </h1>
      <MenuEditForm menu={menu.data} menus={menus.data} />
    </div>
  );
};

export default MenuEditPage;
