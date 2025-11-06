"use client";

import React, { useState, useEffect } from "react";

const UserAdsList = () => {
  const [userAds, setUserAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState({});

  useEffect(() => {
    const fetchUserAds = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/panel/advertisements/advertisement`,
        {
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("خطا در دریافت آگهی ها");
      }

      const result = await response.json();
      setUserAds(result.data);
      setLoading(false);
    };

    fetchUserAds();
  }, []);

  const handleSpecialAdvertisement = async (advertisementId) => {
      setPaymentLoading((prev) => ({ ...prev, [advertisementId]: true }));

      try {
          const response = await fetch(
              '/api/payment',
              {
                  method: 'POST',
                  headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      amount: 1000000,
                      description: 'ویژه کردن آگهی',
                  }),
              }
          );

          const result = await response.json();
          if (result.success && result.payment_url) {
              window.open(result.payment_url, '_blank');
          }
      } catch (e) {
          console.error(e);
      } finally {
          setPaymentLoading((prev) => ({ ...prev, [advertisementId]: false }));
      }
  }

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500">
            <i className="fa fa-spinner fa-spin"></i>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md border border-gray-200 overflow-x-auto">
          {userAds.map((ad) => (
            <div
              key={ad.id}
              className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 hover:bg-gray-200 cursor-pointer "
            >
              <h2 className="text-lg font-bold text-rose-500">{ad.id}</h2>
              <h2 className="text-lg font-bold text-rose-500">{ad.title}</h2>
              <p className="text-sm text-gray-500">{ad.description}</p>
              <p className="text-sm text-gray-500">{ad.price}</p>
              <p className="text-sm text-gray-500">
                {ad.status === 1
                  ? "فعال"
                  : ad.status === 3
                  ? "درحال بررسی"
                  : "رد شده"}
              </p>
                {
                    ! ad.is_special && (
                        <button
                            disabled={paymentLoading[ad.id]}
                            className="bg-rose-500 text-white px-4 py-2 rounded-md"
                            onClick={() => handleSpecialAdvertisement(ad.id)}>
                            {
                                paymentLoading[ad.id] ? (
                                    <i className="fa fa-spin"></i>
                                ) : "ویژه کردن آگهی"
                            }
                        </button>
                    )
                }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAdsList;
