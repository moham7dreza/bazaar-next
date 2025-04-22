"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PageEditForm = ({ page }) => {
  const [title, setTitle] = useState(page.title);
  const [body, setBody] = useState(page.body);
  const [status, setStatus] = useState(page.status.toString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        console.log(`وضعیت توکن`, response.status);

        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("XSRF-TOKEN="))
          ?.split("=")[1];
        if (token) {
          setCsrfToken(token);
        }
      } catch (err) {
        setError(`خطایی در دریافت CSRF`);
        console.log("خطا", err.message);
      }
    };
    fetchCsrfToken();
  }, []);

  const validateForm = () => {
    if (title.length < 2 || title.length > 120) {
      setError("نام باید بین ۲ تا ۱۲۰ کاراکتر باشد");
      return false;
    }
    if (body.length < 2 || body.length > 1000) {
      setError("بدنه باید بین ۲ تا ۱۰۰۰ کاراکتر باشد");
      return false;
    }

    if (status !== "0" && status !== "1") {
      setError("وضعیت باید یکی از مقادیر ۰ یا ۱ باشد");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!csrfToken) {
      setError("خطا در دریافت csrf");
      return;
    }

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const dataToSend = {
      title,
      body,
      status,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/page/${page.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken,
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify(dataToSend),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 419) {
          throw new Error("خطا در توکن csrf");
        }
        if (res.status === 403) {
          throw new Error("شما دسترسی لازم برای این عملیات را ندارید");
        }
        if (res.status === 422) {
          throw new Error(result.message || "خطا در اعتبارسنجی اطلاعات");
        }

        throw new Error("خطایی رخ داده است");
      }

      setSuccess("صفحه با موفقیت ویرایش شد");
      setTitle("");
      setBody("");
      setStatus("1");
      setTimeout(() => {
        router.push("/admin/page");
      }, 1000);
    } catch (error) {
      setError(error.message || "خطا در ارسال اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              عنوان
            </label>
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="عنوان"
              required
            />
            <p className="mt-1 text-xs text-gray-500">بین ۲ تا ۱۲۰ کاراکتر</p>
          </div>

          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              بدنه
            </label>
            <pre className="bg-gray-100 p-4 rounded-md">
                    <code>
                      <textarea
                          rows={20}
                          onChange={(e) => setBody(e.target.value)}
                          id="body"
                          dir="ltr"
                          className="w-full text-left px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                          placeholder="بدنه اصلی"
                          required
                      >
              {body}
            </textarea>
                    </code>
                  </pre>
            <p className="mt-1 text-xs text-gray-500">بین ۲ تا ۱۰۰۰ کاراکتر</p>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              وضعیت
            </label>
            <select
              type="text"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              id="status"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="توضیحات دسته بندی"
              required
            >
              <option value="1">فعال</option>
              <option value="0">غیرفعال</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-100 border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-100 border-green-400 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <div className="flex justify-start">
          <button
            onClick={handleSubmit}
            disabled={loading || !csrfToken}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "در حال ارسال" : "ویرایش"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageEditForm;
