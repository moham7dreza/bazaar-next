"use client";
import React, { useEffect, useState } from "react";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setForm((f) => ({
            ...f,
            [name]: files ? files[0] : value,
        }));
    };

    const handleNext = () => {
        // if (validateStep(step)) {
        setStep(step + 1);
        // }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
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
                                    <option value="active">فعال</option>
                                    <option value="inactive">غیر فعال</option>
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
                </form>
            </div>
        </div>
    );
};

export default CreateAdsPage;
