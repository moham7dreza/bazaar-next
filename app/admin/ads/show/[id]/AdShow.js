"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdShow = ({ ad }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const router = useRouter();

  const converterToJalali = (date) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      calender: "persian",
    };

    const jalaliDate = new Date(date).toLocaleDateString("fa-IR", options);
    return jalaliDate;
  };

  useEffect(() => {
    setImagePreview(
      ad.image
        ? `${process.env.NEXT_PUBLIC_API_URL}/${ad.image.indexArray.medium}`
        : ""
    );
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 border p-4 rounded-md shadow-md">
        <h2 className="text-lg mb-2">عنوان: {ad.title}</h2>
        <p className="text-sm mb-2">
          تاریخ: {converterToJalali(ad.created_at)}
        </p>
        <p className="text-sm mb-2">وضعیت: {ad.status ? "فعال" : "غیرفعال"}</p>
        <p className="text-sm mb-2">توضیحات: {ad.description}</p>
        <p className="text-sm mb-2">نوع: {ad.ads_type}</p>
        <p className="text-sm mb-2">قیمت: {ad.price}</p>
        <p className="text-sm mb-2">وضعیت: {ad.ads_status}</p>
        <p className="text-sm mb-2">دسته بندی: {ad.category.name}</p>
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Image Preview"
            width={200}
            height={200}
            className="mt-2 rounded-md"
            onError={() => setImagePreview("")}
          />
        )}
      </div>
      {error && <div className="text-red-500 text-center my-4">{error}</div>}
    </div>
  );
};

export default AdShow;
