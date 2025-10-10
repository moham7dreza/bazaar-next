"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const GalleryList = ({ advertisementId, galleries }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);

  const router = useRouter();

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

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("advertisement_id", advertisementId);
    if (image) formData.append("url", image);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/${advertisementId}/gallery`,
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

      setSuccess("عکس با موفقیت ایجاد شد");

      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      setError(error.message || "خطا در ارسال اطلاعات");
      // console.error("خطا", error.message);
    } finally {
      setLoading(false);
    }
  };

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
    galleries?.data.forEach((gallery) => {
      setImagesPreview((prev) => [
        ...prev,
        `${process.env.NEXT_PUBLIC_API_URL}/${gallery.url.indexArray.medium}`,
      ]);
    });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("آیا از حذف اطمینان دارید؟")) {
      return;
    }

    setLoading(id);
    setError(null);
    setSuccess(null);

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
      console.log("id : ", id);
      console.log("advertisementId : ", advertisementId);

      if (token) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertisements/${advertisementId}/gallery/${id}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "X-XSRF-TOKEN": token,
            },
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("خطا در حذف");
        }
        setSuccess("با موفقیت حذف شد");
        setTimeout(() => {
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <div>
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
        <button
          onClick={handleSubmit}
          disabled={loading || !csrfToken}
          className="px-6 py-2 my-5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "در حال ارسال" : "ساخت"}
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-right">شناسه</th>
            <th className="border px-4 py-2 text-right">تصویر</th>
            <th className="border px-4 py-2 text-right">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {galleries?.data.map((gallery, index) => {
            return (
              <tr key={gallery.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-right">{gallery.id}</td>

                <td className="border px-4 py-2 text-right">
                  {imagesPreview[index] && (
                    <Image
                      src={imagesPreview[index]}
                      alt="Image Preview"
                      width={200}
                      height={200}
                      className="mt-2 rounded-md"
                    />
                  )}
                </td>
                <td className="border px-4 py-2 text-right">
                  <Link
                    href={`/admin/ads/${advertisementId}/gallery/edit/${gallery.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                  >
                    <i className="fa fa-edit"></i>
                  </Link>
                  <button
                    onClick={() => handleDelete(gallery.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <i className="fa fa-trash"></i>
                  </button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {error && <div className="text-red-500 text-center my-4">{error}</div>}
      {success && (
        <div className="bg-green-300 text-3xl text-green-800 py-3 rounded-lg text-center my-4">
          {success}
        </div>
      )}
    </div>
  );
};

export default GalleryList;
