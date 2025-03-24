import Image from "next/image";
import React from "react";

const LoginRegister = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex flex-col items-center">
          <Image src="/images/logo.png" width={100} height={100} alt="logo" />
          <h2 className="text-2xl font-bold text-rose-800">ورود به حساب</h2>
          <p className="text-gray-600 text-sm mt-1">
            لطفا شماره موبایل خود را وارد نمایید
          </p>
        </div>

        <form action="" className="space-y-5 mt-6">
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              شماره موبایل
            </label>
            <input
              type="number"
              dir="ltr"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-800 focus:border-rose-800 placeholder-gray-400"
              placeholder="۰۹۱۲۱۲۳۴۵۶۷"
            />
          </div>
          <button className="w-full bg-rose-800 text-white py-2 rounded-md shadow-md hover:bg-rose-700 transition-all">
            ارسال کد تایید
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
