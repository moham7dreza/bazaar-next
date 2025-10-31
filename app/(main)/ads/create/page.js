"use client";
import React, { use, useEffect, useState } from "react";

const steps = [
  "اطلاعات اصلی",
  "دسته بندی و شهر",
  "مشخصات ",
  "تصویر و قیمت",
  "تایید و ثبت",
];

const CreateAdsPage = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: "",
    description: "",
    ads_type: "",
    ads_status: "",
    category_id: "",
    city_id: "",
    contact: "",
    image: "",
    imagePreview: "",
    price: "",
    tags: "",
    lng: "",
    lat: "",
    willing_to_trade: "",
  });

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [categoryAttributes, setCategoryAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState({});
  const [selectedAttributeValues, setSelectedAttributeValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function getCsrfToken() {
    if (typeof document === "undefined") return null;
    const cookies = document.cookie.split(";").map((c) => c.trim());
    for (const c of cookies) {
      if (c.startsWith("XSRF-TOKEN=")) {
        return decodeURIComponent(c.substring("XSRF-TOKEN=".length));
      }
    }
    return null;
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": getCsrfToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch((err) => setError(err.message));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cities`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": getCsrfToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => setCities(data.data))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!form.category_id) return;

    setCategoryAttributes([]);
    setAttributeValues({});
    setSelectedAttributeValues({});

    fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/advertisements/category/${form.category_id}/attributes`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(async (result) => {
        const attributes = (result.data || [])
          console.log(attributes)
        setCategoryAttributes(attributes);
        if (attributes.length === 0) return;
        const values = {};
        await Promise.all(
          attributes.map(async (attribute) => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/advertisements/category/${attribute.id}/values`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            );
            const result = await response.json();
            values[attribute.id] = result.data || [];
          })
        );
        console.log("fetched attribute values", values);
        setAttributeValues(values);
      });
  }, [form.category_id]);

  const handleSubmit = async (e) => {
    console.log(form);

    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });
      const csrfToken = getCsrfToken();
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== null && v !== undefined && v !== "") {
          if (k === "price" || k === "lng" || k === "lat") {
            formData.append(k, Number(v));
          } else if (k === "willing_to_trade") {
            formData.append(k, Number(v));
          } else if (k === "category_id" || k === "city_id") {
            formData.append(k, Number(v));
          } else {
            formData.append(k, v);
          }
        }
      });

      Object.entries(selectedAttributeValues).forEach((valId) => {
        if (valId) {
          formData.append("category_values[]", parseInt(valId));
        }
      });

      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/panel/advertisements/advertisement`,
          {
            method: "POST",
            body: formData,
            headers: {
              "X-XSRF-TOKEN": csrfToken,
              Accept: "application/json",
            },
            credentials: "include",
          }
      );

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 419) {
          throw new Error("Session expired, please login again");
        }
        throw new Error(data.message || "An error occurred");
      }

      setSuccess(data.message || "آگهی با موفقیت ثبت شد");
      setForm({
        title: "",
        description: "",
        contact: "",
        category_id: "",
        city_id: "",
        ads_type: "",
        ads_status: "",
        tags: "",
        lng: "",
        lat: "",
        willing_to_trade: "",
        price: "",
        image: "",
        imagePreview: "",
      });
      setStep(0);
      setSelectedAttributeValues({});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!form.title || !form.description || !form.contact) {
      setError("لطفا تمامی فیلد ها را پر کنید");
      return false;
    }

    if (!form.category_id || !form.city_id) {
      setError("لطفا دسته بندی و شهر را انتخاب کنید");
      return false;
    }

    if (
        !form.ads_type ||
        !form.ads_status ||
        !form.tags ||
        !form.lng ||
        !form.lat ||
        !form.willing_to_trade
    ) {
      setError("لطفا تمامی فیلد ها را پر کنید");
      return false;
    }

    if (!form.price || !form.image) {
      setError("لطفا قیمت و تصویر را انتخاب کنید");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((f) => ({
      ...f,
      [name]: files ? files[0] : value,
    }));
  };

  const validateStep = (currentStep) => {
    setError("");

    if (currentStep === 0) {
      if (!form.title || !form.description || !form.contact) {
        setError("لطفا تمامی فیلد ها را پر کنید");
        return false;
      }
    }

    if (currentStep === 1) {
      if (!form.category_id) {
        setError("لطفا دسته بندی را انتخاب کنید");
        return false;
      }
      if (!form.city_id) {
        setError("لطفا شهر را انتخاب کنید");
        return false;
      }
    }

    if (currentStep === 2) {
      if (
          !form.ads_type ||
          !form.ads_status ||
          !form.tags ||
          !form.lng ||
          !form.lat ||
          !form.willing_to_trade
      ) {
        setError("لطفا تمامی فیلد ها را پر کنید");
        return false;
      }
    }

    if (currentStep === 3) {
      if (!form.price || !form.image) {
        setError("لطفا قیمت و تصویر را انتخاب کنید");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div>
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
        <div className="flex justify-between mb-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex-1 text-center text-sm ${
                step === i ? "text-red-700 font-bold" : "text-gray-500"
              }`}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                {i + 1}
              </div>
              <p className="text-sm">{s}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 0 && (
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="عنوان آگهی"
                className="w-full p-2 border border-gray-300 rounded-md"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="توضیحات آگهی"
                className="w-full p-2 border border-gray-300 rounded-md"
              ></textarea>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="شماره تماس"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  type="button"
                  className="bg-red-700 text-white p-2 rounded-md px-4 py-2"
                >
                  ادامه
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">انتخاب دسته بندی</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
              {categoryAttributes.length > 0 &&
                Object.keys(attributeValues).length ===
                  categoryAttributes.length && (
                  <div className="space-y-2">
                    <label
                      htmlFor=""
                      className="text-sm block mb-2 font-bold text-gray-700"
                    >
                      ویژگی های دسته بندی
                    </label>
                    {categoryAttributes.map((attr) => (
                      <div className="mb-2" key={attr.id}>
                        <label
                          htmlFor={`attr_${attr.id}`}
                          className="text-sm block mb-2 font-bold text-gray-700 mr-2"
                        >
                          {attr.name}
                        </label>
                        <select
                          name={`attr_${attr.id}`}
                          value={form[`attr_${attr.id}`]}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          {(attributeValues[attr.id] || [])
                            .map((val) => (
                              <option key={val.id} value={val.id}>
                                {val.value}
                              </option>
                            ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}

              <hr />

              <select
                name="city_id"
                value={form.city_id}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">انتخاب شهر</option>
                {cities.length > 0 &&
                  cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleBack}
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded-md px-4 py-2"
                >
                  قبلی
                </button>
                <button
                  onClick={handleNext}
                  type="button"
                  className="bg-red-700 text-white p-2 rounded-md px-4 py-2"
                >
                  ادامه
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <input
                type="text"
                name="ads_type"
                value={form.ads_type}
                onChange={handleChange}
                placeholder="نوع آگهی"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <div>
                <label htmlFor="ads_status" className="text-sm block mb-2">
                  وضعیت آگهی
                </label>
                <select
                  name="ads_status"
                  value={form.ads_status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="new">نوع</option>
                  <option value="used">دسته دوم</option>
                </select>
              </div>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="تگ ها با کاما جدا کنید"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                name="lng"
                value={form.lng}
                onChange={handleChange}
                placeholder="طول جغرافیایی"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                name="lat"
                value={form.lat}
                onChange={handleChange}
                placeholder="عرض جغرافیایی"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <div>
                <label
                  htmlFor="willing_to_trade"
                  className="text-sm block mb-2"
                >
                  مایل به معاوضه
                </label>
                <select
                  name="willing_to_trade"
                  value={form.willing_to_trade}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="1">بله</option>
                  <option value="0">خیر</option>
                </select>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleBack}
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded-md px-4 py-2"
                >
                  قبلی
                </button>
                <button
                  onClick={handleNext}
                  type="button"
                  className="bg-red-700 text-white p-2 rounded-md px-4 py-2"
                >
                  ادامه
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="قیمت"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {form.imagePreview && (
                  <div className="mt-2">
                    <img
                        src={form.imagePreview}
                        alt="image"
                        className="w-24 h-24 h-auto"
                    />
                  </div>
              )}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleBack}
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded-md px-4 py-2"
                >
                  قبلی
                </button>
                <button
                  onClick={handleNext}
                  type="button"
                  className="bg-red-700 text-white p-2 rounded-md px-4 py-2"
                >
                  ادامه
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h1>تایید و ثبت</h1>
              <div>
                <p>عنوان آگهی</p>
                <p>{form.title}</p>
              </div>
              <div>
                <p>توضیحات آگهی</p>
                <p>{form.description}</p>
              </div>
              <div>
                <p>قیمت</p>
                <p>{form.price}</p>
              </div>
              <div>
                <p>تصویر</p>
              </div>
              <div>
                <p>تگ ها</p>
                <p>{form.tags}</p>
              </div>
              <div>
                <p>طول جغرافیایی</p>
                <p>{form.lng}</p>
              </div>
              <div>
                <p>عرض جغرافیایی</p>
                <p>{form.lat}</p>
              </div>
              <div>
                <p>مایل به معاوضه</p>
                <p>{form.willing_to_trade === "no" ? "خیر" : "بله"}</p>
              </div>
              <div>
                <p>دسته بندی</p>
                <p>{form.category_id}</p>
              </div>
              <div>
                <p>شماره تماس</p>
                <p>{form.contact}</p>
              </div>
              <div>
                <p>شهر</p>
                <p>{form.city_id}</p>
              </div>
              <div>
                <p>وضعیت آگهی</p>
                <p>{form.ads_status === 'new' ? 'نو' : 'دست دوم'}</p>
              </div>
              <div>
                <p>نوع آگهی</p>
                <p>{form.ads_type}</p>
              </div>
              <div>
                <p>نوع آگهی</p>
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="bg-red-700 text-white p-2 rounded-md px-4 py-2"
                >
                  ثبت
                </button>
              </div>
            </div>
          )}
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {success && <div className="text-green-500 mt-4">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateAdsPage;
