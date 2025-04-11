"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const StateEditForm = ({ state, states }) => {
  const [name, setName] = useState(state.name);
  const [description, setDescription] = useState(state.description);
  const [status, setStatus] = useState(state.status.toString());
  const [icon, setIcon] = useState(state.icon || "");
  const [parentId, setParentId] = useState(state.parent_id || null);
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
    if (name.length < 2 || name.length > 120) {
      setError("نام باید بین ۲ تا ۱۲۰ کاراکتر باشد");
      return false;
    }
    if (description.length < 2 || description.length > 500) {
      setError("توضیحات باید بین ۲ تا ۵۰۰ کاراکتر باشد");
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
      name,
      description,
      status,
      icon,
      parent_id: parentId ? parseInt(parentId) : null,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertise/state/${state.id}`,
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

      setSuccess("منطقه با موفقیت ویرایش شد");
      setName("");
      setDescription("");
      setStatus("1");
      setIcon("");
      setParentId(null);
      setTimeout(() => {
        router.push("/admin/state");
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
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              نام
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="نام منطقه"
              required
            />
            <p className="mt-1 text-xs text-gray-500">بین ۲ تا ۱۲۰ کاراکتر</p>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              توضیحات
            </label>
            <textarea
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="توضیحات منطقه"
              required
            ></textarea>
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
              type="text"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              id="status"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="توضیحات منطقه"
              required
            >
              <option value="1">فعال</option>
              <option value="0">غیرفعال</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">بین ۲ تا ۵۰۰ کاراکتر</p>
          </div>

          <div className="flex">
            <div className="w-1/2">
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
                placeholder="توضیحات منطقه"
                required
              />
              <p className="mt-1 text-xs text-gray-500">کلاس fontawesome</p>
            </div>

            <div className="w-1/2">
              <label
                htmlFor="parent_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                منطقه پدر
              </label>
              <select
                type="text"
                onChange={(e) => setParentId(e.target.value)}
                value={parentId || ""}
                id="parent_id"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                placeholder="توضیحات منطقه"
                required
              >
                <option value="">منطقه اصلی</option>
                {states
                  .filter((cat) => cat.id !== state.id)
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
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

export default StateEditForm;
