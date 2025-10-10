"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoryAttributeEditForm = ({ categoryAttribute, categories }) => {
  const [name, setName] = useState(categoryAttribute.name || "");
  const [unit, setUnit] = useState(categoryAttribute.unit || "");
  const [categoryId, setCategoryId] = useState(
    categoryAttribute.category ? categoryAttribute.category.id.toString() : ""
  );
  const [type, setType] = useState(categoryAttribute.type || "0");
  const [status, setStatus] = useState(categoryAttribute.status || "0");
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
        console.error("خطا", err.message);
      }
    };
    fetchCsrfToken();
  }, []);

  const validateForm = () => {
    if (name.length < 2 || name.length > 120) {
      setError("نام باید بین ۲ تا ۱۲۰ کاراکتر باشد");
      return false;
    }
    if (unit.length < 2 || unit.length > 120) {
      setError("واحد باید بین ۲ تا ۱۲۰ کاراکتر باشد");
      return false;
    }
    if (status !== "0" && status !== "1") {
      setError("وضعیت باید یکی از مقادیر ۰ یا ۱ باشد");
      return false;
    }
    if (type !== "0" && type !== "1") {
      setError("نوع باید یکی از مقادیر ۰ یا ۱ باشد");
      return false;
    }
    if (!categoryId) {
      setError("انتخاب دسته بندی اجباری است");
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
      unit,
      category_id: parseInt(categoryId),
      type,
      status: status,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/category-attribute/${categoryAttribute.id}`,
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

      setSuccess("ویژگی با موفقیت ویرایش شد");
      setName("");
      setType("0");
      setStatus("0");
      setUnit("");
      setTimeout(() => {
        router.push("/admin/category-attribute");
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
              نام
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="نام دسته بندی"
              required
            />
            <p className="mt-1 text-xs text-gray-500">بین ۲ تا ۱۲۰ کاراکتر</p>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              واحد
            </label>
            <input
              type="text"
              id="unit"
              onChange={(e) => setUnit(e.target.value)}
              value={unit}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="واحد"
              required
            />
            <p className="mt-1 text-xs text-gray-500">بین ۲ تا ۱۲۰ کاراکتر</p>
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
            <p className="mt-1 text-xs text-gray-500">بین ۲ تا ۵۰۰ کاراکتر</p>
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              نوع
            </label>
            <select
              onChange={(e) => setType(e.target.value)}
              value={type}
              id="type"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              required
            >
              <option value="1">فعال</option>
              <option value="0">غیرفعال</option>
            </select>
          </div>

          <div className="w-full">
            <label
              htmlFor="parent_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              دسته بندی
            </label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
              id="category_id"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
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
            {loading ? "در حال ارسال" : "ویرایش"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryAttributeEditForm;
