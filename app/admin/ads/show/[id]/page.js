import React from "react";
import AdShow from "./AdShow";

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

const AdPage = async ({ params }) => {
  let { id } = await params;
  const ad = await getAd(id);

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">نمایش آگهی</h1>

      <div>
        <AdShow ad={ad.data} />
      </div>
    </div>
  );
};

export default AdPage;
