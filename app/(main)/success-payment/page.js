"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SuccessPaymentPage = () => {
  const searchParams = useSearchParams();
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  const [mainStatus, setMainStatus] = useState("checking");

  useEffect(() => {
    if (authority && status === "OK") {
      //   verifyPayment(authority);
      setMainStatus("success");
    } else {
      setMainStatus("failed");
    }
  }, [authority, status]);

  if (mainStatus === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500">
            <i className="fa fa-spinner fa-spin"></i>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">پرداخت با موفقیت انجام شد</h1>
          </div>
          <p>وضعیت پرداخت: {status}</p>
          <p>وضعیت اصلی: {mainStatus}</p>
          <p>تاریخ پرداخت: {new Date().toLocaleDateString()}</p>
          <p>ساعت پرداخت: {new Date().toLocaleTimeString()}</p>
          <p>تاریخ و ساعت پرداخت: {new Date().toLocaleString()}</p>
          <p>تاریخ و ساعت پرداخت: {new Date().toLocaleString()}</p>
        </div>
      </div>
    );
  } else if (mainStatus === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg">
          <h1 className="text-2xl font-bold">در حال بررسی پرداخت</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg">
          <h1 className="text-2xl font-bold">پرداخت با شکست مواجه شد</h1>
        </div>
      </div>
    );
  }
};

export default SuccessPaymentPage;
