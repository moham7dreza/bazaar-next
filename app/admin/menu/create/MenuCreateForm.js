"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MenuCreateForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("1");
  const [icon, setIcon] = useState("");
  const [parentId, setParentId] = useState(null);
  //
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  //
  const [csrfToken, setCsrfToken] = useState(null);
  const [menus, setMenus] = useState([]);
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
        console.error("خطا", err.message);
      }
    };
    fetchCsrfToken();
  }, []);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/menu`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
          }
        );
        const result = await response.json();
        setMenus(result.data);
      } catch (err) {
        setError(`خطایی در دریافت منو ها`);
        console.error("خطا", err.message);
      }
    };
    fetchMenus();
  }, []);

  const validateForm = () => {
    if (title.length < 2 || title.length > 120) {
      setError("نام باید بین ۲ تا ۱۲۰ کاراکتر باشد");
      return false;
    }
    if (url.length < 2 || url.length > 500) {
      setError("آدرس باید بین ۲ تا ۵۰۰ کاراکتر باشد");
      return false;
    }
    if (position.length < 2 || position.length > 500) {
      setError("مکان منو باید بین ۲ تا ۵۰۰ کاراکتر باشد");
      return false;
    }
    if (status !== "0" && status !== "1") {
      setError("وضعیت باید یکی از مقادیر ۰ یا ۱ باشد");
      return false;
    }
    if (icon.length < 1 || icon.length > 120) {
      setError("آیکون باید بین ۱ تا ۱۲۰ کاراکتر باشد");
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
      position,
      url,
      status,
      icon,
      parent_id: parentId ? parseInt(parentId) : null,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/menu`,
        {
          method: "POST",
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
      console.log("result : ", result);

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

      setSuccess("منو با موفقیت ایجاد شد");
      setTitle("");
      setPosition("");
      setUrl("");
      setStatus("1");
      setIcon("");
      setParentId(null);
      setTimeout(() => {
        router.push("/admin/menu");
      }, 1000);
    } catch (error) {
      setError(error.message || "خطا در ارسال اطلاعات");
      // console.log("خطا", error.message);
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
              htmlFor="title"
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
              placeholder="عنوان منو"
              required
            />
            <p className="mt-1 text-xs text-gray-500">بین ۲ تا ۱۲۰ کاراکتر</p>
          </div>

          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              آدرس
            </label>
            <input
                type="text"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              id="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="آدرس منو"
              required
            ></input>
            <p className="mt-1 text-xs text-gray-500">بین ۲ تا ۵۰۰ کاراکتر</p>
          </div>

          <div>
            <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
              مکان
            </label>
            <input
                type="text"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
                id="position"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                placeholder="مکان منو"
                required
            ></input>
            <p className="mt-1 text-xs text-gray-500">بین ۲ تا ۵۰۰ کاراکتر</p>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              وضعیت
            </label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              id="status"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              required
            >
              <option value="1">فعال</option>
              <option value="0">غیرفعال</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="icon"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              آیکون
            </label>
            <input
              type="text"
              onChange={(e) => setIcon(e.target.value)}
              value={icon}
              id="icon"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="توضیحات دسته بندی"
              required
            />
            <p className="mt-1 text-xs text-gray-500">کلاس fontawesome</p>
          </div>

          <div>
            <label
              htmlFor="parent_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              منوی والد
            </label>
            <select
              onChange={(e) => setParentId(e.target.value)}
              value={parentId || ""}
              id="parent_id"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              required
            >
              <option value="">دسته اصلی</option>
              {menus?.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.title}
                </option>
              ))}
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
            {loading ? "در حال ارسال" : "ساخت"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCreateForm;
