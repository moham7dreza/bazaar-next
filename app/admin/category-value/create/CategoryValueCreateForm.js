"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoryValueCreateForm = () => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("0");
  // const [type, setType] = useState("0");
  const [categoryAttributeId, setCategoryAttributeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [categoryAttributes, setCategoryAttributes] = useState([]);
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
    const fetchCategoryAttributes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/category-attribute`,
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
        setCategoryAttributes(result.data);
      } catch (err) {
        setError(`خطایی در دریافت مناطق`);
        console.error("خطا", err.message);
      }
    };
    fetchCategoryAttributes();
  }, []);

  const validateForm = () => {
    if (value.length < 2 || value.length > 120) {
      setError("مقدار باید بین ۲ تا ۱۲۰ کاراکتر باشد");
      return false;
    }

    if (status !== "0" && status !== "1") {
      setError("وضعیت باید یکی از مقادیر ۰ یا ۱ باشد");
      return false;
    }

    if (!categoryAttributeId) {
      setError("انتخاب ویژگی دسته بندی اجباری است");
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
      value,
      status,
      type: 0,
      category_attribute_id: parseInt(categoryAttributeId),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/category-value`,
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

      setSuccess("مقدار با موفقیت ایجاد شد");
      setValue("");
      setStatus("0");
      setCategoryAttributeId("");
      setTimeout(() => {
        router.push("/admin/category-value");
      }, 1000);
    } catch (error) {
      setError(error.message || "خطا در ارسال اطلاعات");
      // console.error("خطا", error.message);
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
              مقدار
            </label>
            <input
              type="text"
              id="value"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="مقدار"
              required
            />
            <p className="mt-1 text-xs text-gray-500">بین ۲ تا ۱۲۰ کاراکتر</p>
          </div>

          <div className="flex space-x-2 space-x-reverse">
            <div className="w-1/2">
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
                placeholder="توضیحات  "
                required
              >
                <option value="1">فعال</option>
                <option value="0">غیرفعال</option>
              </select>
            </div>

            <div className="w-1/2">
              <label
                htmlFor="category_attribute_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ویژگی
              </label>
              <select
                onChange={(e) => setCategoryAttributeId(e.target.value)}
                value={categoryAttributeId || ""}
                id="category_attribute_id"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                required
              >
                {categoryAttributes.map((categoryAttribute) => (
                  <option
                    key={categoryAttribute.id}
                    value={categoryAttribute.id}
                  >
                    {categoryAttribute.name}
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
            {loading ? "در حال ارسال" : "ساخت"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryValueCreateForm;
