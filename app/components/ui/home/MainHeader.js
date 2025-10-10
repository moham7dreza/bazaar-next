import Image from "next/image";
import React from "react";
import Link from "next/link";
import CityList from "@/app/components/ui/home/CityList";
import CategoryHeader from "@/app/components/ui/home/CategoryHeader";

const MainHeader = () => {
  return (
    <div>
      <header className="bg-white fixed end-0 start-0 shadow-md lg:hidden">
        <div className="container px-6 py-4 flex justify-between items-center">
          <section>
            <a href="#">
              <i className="fa fa-arrow-right text-gray-500"></i>
            </a>
          </section>
          <section className="flex space-x-6 space-x-reverse">
            <div>
              <a href="#">
                <i className="fa fa-dashcube text-gray-500 text-lg"></i>
              </a>
            </div>
            <div>
              <a href="#">
                <i className="fa fa-plus-circle text-gray-500 text-lg"></i>
              </a>
            </div>
            <div>
              <a href="#">
                <i className="fa fa-share text-gray-500 text-lg"></i>
              </a>
            </div>
          </section>
        </div>
      </header>
      <header className="flex justify-center items-center border-b-2 pb-4 pt-3 lg:space-x-8 lg:space-x-reverse xl:space-x-12 xl:space-x-reverse">
        <section className="hidden lg:flex">
          <Image
            className="w-14 h-14"
            src={"/images/logo.png"}
            alt="logo"
            width={60}
            height={60}
          />
        </section>

        <section className="hidden lg:flex text-gray-500">
          <CityList/>
        </section>

        <section className="hidden lg:flex text-gray-500">
            <CategoryHeader/>
        </section>

        <section className="container mx-4 lg:mx-0 lg:w-2/6 flex justify-center items-center bg-gray-100 rounded-sm">
          <input
            type="text"
            placeholder="جستجو در همه آگهی ها"
            className="fa border-l lg:border-l-0 border-gray-300 w-5/6 py-1 my-2 ps-2 lg:w-[94%] placeholder:text-gray-400 placeholder:text-lg bg-gray-100"
          />
          <div className="mx-1 flex justify-center lg:hidden  items-center space-x-2 space-x-reverse">
            <button className="text-gray-600 ms-2">تهران</button>
            <i className="fa fa-map-marker text-xl text-gray-400"></i>
          </div>
        </section>

        <section className="hidden lg:flex text-gray-500">
          <button className="flex justify-center items-center space-x-3 space-x-reverse">
            <i className="fa fa-user text-xl text-gray-500"></i>
            <p className="text-xs">دیوار من</p>
          </button>
        </section>

        <section className="hidden lg:flex text-gray-500">
          <button className="flex justify-center items-center space-x-3 space-x-reverse">
            <i className="fa fa-comment text-xl text-gray-500"></i>
            <p className="text-xs">چت</p>
          </button>
        </section>

        <section className="hidden lg:flex text-gray-500">
          <button className="flex justify-center items-center">
            <p className="text-xs">پشتیبانی</p>
          </button>
        </section>

        <section className="hidden lg:flex text-gray-500">
          <Link href="/admin" className="flex justify-center items-center bg-red-700 text-white px-5 py-2 font-bold rounded">
            ثبت آگهی
          </Link>
        </section>
      </header>
    </div>
  );
};

export default MainHeader;
