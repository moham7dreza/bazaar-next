"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GalleryEditForm({ galleryId, advertisementId }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("لطفاً یک تصویر جدید انتخاب کنید");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const resCsrf = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
      });
      const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split("=");
        acc[name] = value;
        return acc;
      }, {});
      const csrfToken = decodeURIComponent(cookies["XSRF-TOKEN"]);
      const formData = new FormData();
      formData.append("advertisement_id", advertisementId);
      formData.append("gallery_id", galleryId);
      formData.append("_method", "PUT");
      if (file) formData.append("url", file);
      // لاگ گرفتن مقدار file و FormData
      console.log("file", file);
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/${advertisementId}/gallery/${galleryId}`,
        {
          method: "POST",
          headers: {
            "X-XSRF-TOKEN": csrfToken,
            Accept: "application/json",
          },
          credentials: "include",
          body: formData,
        }
      );
      if (res.status === 401 || res.status === 403) {
        router.push("/admin/auth/login");
        return;
      }
      if (!res.ok) throw new Error("خطا در بروزرسانی تصویر");
      setSuccess("تصویر با موفقیت بروزرسانی شد!");
      setTimeout(() => {
        router.push(`/admin/ads/${advertisementId}/gallery`);
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">انتخاب تصویر جدید</label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border px-4 py-2 rounded-md w-full"
        />
      </div>
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}
      {success && <div className="p-4 bg-green-100 text-green-700 rounded-md text-center">{success}</div>}
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-600 text-white rounded-md disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "در حال بروزرسانی..." : "ثبت تصویر جدید"}
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-gray-400 text-white rounded-md"
          onClick={() => router.push(`/admin/ads/${advertisementId}/gallery`)}
          disabled={loading}
        >
          انصراف
        </button>
      </div>
    </form>
  );
} 