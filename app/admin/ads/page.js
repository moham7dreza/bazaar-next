import React from "react";
import Link from "next/link";
import AdsList from "./AdsList";

const AdsPage = async () => {
  let ads;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/advertisement`,
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

    ads = await res.json();

    if (!ads.status) {
      throw new Error("خطا در دریافت اطلاعات");
    }
  } catch (err) {
    console.log(err);
  }
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">لیست آگهی ها</h1>

      <div>
        <Link
          href={"/admin/ads/create"}
          className="bg-blue-500 text-white px-4 py-2 inline-block rounded-md hover:bg-blue-600 mb-4"
        >
          ساخت
        </Link>
      </div>
      <AdsList ads={ads} />
    </div>
  );
};

export default AdsPage;
