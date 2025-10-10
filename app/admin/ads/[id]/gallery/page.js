import React from "react";
import Link from "next/link";
import GalleryList from "./GalleryList";

const GalleryPage = async ({ params }) => {
  let { id } = await params;
  let galleries;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/${id}/gallery`,
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

    galleries = await res.json();

    if (!galleries.status) {
      throw new Error("خطا در دریافت اطلاعات");
    }
  } catch (err) {
    console.error(err);
  }
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">لیست تصاویر آگهی</h1>
      <GalleryList advertisementId={id} galleries={galleries} />
    </div>
  );
};

export default GalleryPage;
