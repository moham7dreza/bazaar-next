"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const StateCreateForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adsType, setAdsType] = useState("");
  const [adsStatus, setAdsStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [userId, setUserId] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [expiredAt, setExpiredAt] = useState("");
  const [contact, setContact] = useState("");
  const [isSpecial, setIsSpecial] = useState();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState("");
  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");
  const [willingToTrade, setWillingToTrade] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  // advertisement category attributes and values
  const [categoryAttributes, setCategoryAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState({});
  const [selectedAttributeValues, setSelectedAttributeValues] = useState({});

    useEffect(() => {
        let ignore = false

        setCategoryAttributes([])
        setAttributeValues({})
        setSelectedAttributeValues({})

        if (! categoryId) return

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/advertisements/category/${categoryId}/attributes`,
                    {
                        headers: {
                            Accept: "application/json",
                        }
                    }
                );
                const result = await response.json();
                const attributes = result.data;

                if (ignore) return
                setCategoryAttributes(attributes);

                if (attributes.length === 0) return

                const values = {}

                await Promise.all(attributes.map(async (attribute) => {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/advertisements/category/${attribute.id}/values`,
                        {
                            headers: {
                                 Accept: "application/json",
                            }
                        }
                    );
                    const result = await response.json();
                    values[attribute.id] = result.data || [];
                }))
                if (ignore) return;
                setAttributeValues(values);
            } catch (err) {
                setError(`خطایی در دریافت داده ها`);
                console.error("خطا", err);
            }
        }
        fetchData()
        // console.log(categoryAttributes, attributeValues)
        return () => {
            ignore = true;
        }
    }, [categoryId]);

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
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/category`,
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
        setCategories(result.data);
      } catch (err) {
        setError(`خطایی در دریافت دسته بندی ها`);
        console.error("خطا", err.message);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cities`,
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
        setCities(result.data);
      } catch (err) {
        setError(`خطایی در دریافت شهرها`);
        console.error("خطا", err.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/user`,
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
        setUsers(result.data);
      } catch (err) {
        setError(`خطایی در دریافت کاربران`);
        console.error("خطا", err.message);
      }
    };

    fetchCategories();
    fetchCities();
    fetchUsers();
  }, []);

  const validateForm = () => {
    if (title.length < 2 || title.length > 120) {
      setError("عنوان باید بین ۲ تا ۱۲۰ کاراکتر باشد");
      return false;
    }
    if (description.length < 2 || description.length > 500) {
      setError("توضیحات باید بین ۲ تا ۵۰۰ کاراکتر باشد");
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (adsType) formData.append("ads_type", adsType);
    formData.append("ads_status", adsStatus);
    formData.append("category_id", categoryId);
    formData.append("city_id", cityId);
    formData.append("user_id", userId);
    formData.append("status", status);
    if (publishedAt) formData.append("published_at", publishedAt);
    if (expiredAt) formData.append("expired_at", expiredAt);
    if (contact) formData.append("contact", contact);
    if (isSpecial) formData.append("is_special", isSpecial);
    if (image) formData.append("image", image);
    if (tags) formData.append("tags", tags);
    if (lng) formData.append("lng", lng);
    if (lat) formData.append("lat", lat);
    if (willingToTrade) formData.append("willing_to_trade", willingToTrade);
    if (price) formData.append("price", price);
    Object.values(selectedAttributeValues).forEach((value_id) => {
      if (value_id) formData.append("category_value_id[]", parseInt(value_id));
    });

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/advertisement`,
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

      setSuccess("آگهی با موفقیت ایجاد شد");

      setTimeout(() => {
        router.push("/admin/ads");
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
              placeholder="عنوان"
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
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="توضیحات  "
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
              htmlFor="ads_type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              نوع آگهی
            </label>
            <input
              type="text"
              id="ads_type"
              onChange={(e) => setAdsType(e.target.value)}
              value={adsType}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="بازی"
              required
            />
          </div>{" "}
          <div>
            <label
              htmlFor="is_special"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ویژه
            </label>
            <select
              onChange={(e) => setIsSpecial(e.target.value)}
              value={isSpecial}
              id="is_special"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              required
            >
              <option value="1">بله</option>
              <option value="0">خیر</option>
            </select>
          </div>{" "}
          <div>
            <label
              htmlFor="willing_to_trade"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              مایل به معاوضه
            </label>
            <select
              onChange={(e) => setWillingToTrade(e.target.value)}
              value={willingToTrade}
              id="willing_to_trade"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              required
            >
              <option value="1">بله</option>
              <option value="0">خیر</option>
            </select>
          </div>{" "}
          <div>
            <label
              htmlFor="ads_status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              وضعیت آگهی
            </label>
            <select
              onChange={(e) => setAdsStatus(e.target.value)}
              value={adsStatus}
              id="ads_status"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              required
            >
              <option value="as_good_as_new">درحد نو</option>
              <option value="used">درحد مورد استفاده</option>
              <option value="broken">خراب</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="category_id"
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
              <option value="">انتخاب کنید</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>{" "}

            <div>
                {
                    categoryAttributes.length > 0 && categoryAttributes.length === Object.keys(attributeValues).length && (
                        <>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ویژگی دسته بندی ها
                            </label>
                            {
                                categoryAttributes.map((attribute) => (
                                    <div key={attribute.id} className="mb-2">
                                        <label className="block text-xs mb-1">
                                            ویژگی : {attribute.name}
                                        </label>
                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                            value={attributeValues[attribute.id] || ""}
                                                onChange={(e) => setSelectedAttributeValues(prev => ({ ...prev, [attribute.id]: e.target.value }))}
                                        >
                                            <option value="">مقدار ویژگی را انتخاب کنید</option>
                                            {
                                                attributeValues[attribute.id].map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.value}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                ))
                            }
                        </>
                    )
                }
            </div>
          <div>
            <label
              htmlFor="cityId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              شهر
            </label>
            <select
              onChange={(e) => setCityId(e.target.value)}
              value={cityId}
              id="cityId"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              required
            >
              <option value="">انتخاب کنید</option>
              {cities?.map((city, index) => (
                <option key={index} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>{" "}
          <div>
            <label
              htmlFor="user_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              کاربر
            </label>
            <select
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
              id="user_id"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              required
            >
              <option value="">انتخاب کنید</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>{" "}
          <div>
            <label
              htmlFor="published_at"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              تاریخ انتشار
            </label>
            <input
              type="date"
              id="published_at"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="expired_at"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              تاریخ انقضا
            </label>
            <input
              type="date"
              id="expired_at"
              value={expiredAt}
              onChange={(e) => setExpiredAt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              تماس
            </label>
            <input
              type="text"
              id="contact"
              onChange={(e) => setContact(e.target.value)}
              value={contact}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="تماس"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              قیمت
            </label>
            <input
              type="number"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              تگ ها
            </label>
            <input
              type="text"
              id="tags"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="lng"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              lng
            </label>
            <input
              type="number"
              id="lng"
              onChange={(e) => setLng(e.target.value)}
              value={lng}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="lat"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              lat
            </label>
            <input
              type="number"
              id="lat"
              onChange={(e) => setLat(e.target.value)}
              value={lat}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              عکس
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Image Preview"
                width={100}
                height={100}
                className="mt-2 rounded-md"
                onError={() => setImagePreview("")}
              />
            )}
          </div>{" "}
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

export default StateCreateForm;
