import React from "react";
import AdEditForm from "./AdEditForm";

async function getAd(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/advertisement/${id}`,
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

const AdEditPage = async ({ params }) => {
  let { id } = await params;
  const ad = await getAd(id);
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ویرایش آگهی</h1>
      <AdEditForm ad={ad.data} />
    </div>
  );
};

export default AdEditPage;
