import React from "react";
import PageEditForm from "./PageEditForm";

async function getPage(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/page/${id}`,
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

const PageEditPage = async ({ params }) => {
  let { id } = await params;
  const page = await getPage(id);
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ویرایش منو </h1>
      <PageEditForm page={page.data} />
    </div>
  );
};

export default PageEditPage;
