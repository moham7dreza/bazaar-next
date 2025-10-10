import React from "react";
import Sidebar from "../components/ui/home/Sidebar";
import AdvertisementList from "@/app/components/ui/home/AdvertisementList";

const Home = () => {
  return (
    <section className="flex lg:container mt-10 pb-52 lg:mt-0">
      <Sidebar />

      <main className="lg:w-4/5">
        <section className="flex flex-wrap justify-center md:justify-start lg:hidden">
          <div className=" w-28 flex justify-center items-center flex-col mx-6 my-3">
            <div className=" bg-gray-100 w-full flex justify-center items-center p-1 rounded-lg">
              <i className="fa fa-home text-red-700 text-3xl"></i>
            </div>
            <h4 className="mt-2">املاک</h4>
          </div>
          <div className=" w-28 flex justify-center items-center flex-col mx-6 my-3">
            <div className=" bg-gray-100 w-full flex justify-center items-center p-1 rounded-lg">
              <i className="fa fa-car text-red-700 text-3xl"></i>
            </div>
            <h4 className="mt-2">وسایل نقلیه</h4>
          </div>
          <div className=" w-28 flex justify-center items-center flex-col mx-6 my-3">
            <div className=" bg-gray-100 w-full flex justify-center items-center p-1 rounded-lg">
              <i className="fa fa-mobile text-red-700 text-3xl"></i>
            </div>
            <h4 className="mt-2">کالای دیجیتال</h4>
          </div>
          <div className=" w-28 flex justify-center items-center flex-col mx-6 my-3">
            <div className=" bg-gray-100 w-full flex justify-center items-center p-1 rounded-lg">
              <i className="fa fa-spoon text-red-700 text-3xl"></i>
            </div>
            <h4 className="mt-2">خانه و آشپزخانه</h4>
          </div>
          <div className=" w-28 flex justify-center items-center flex-col mx-6 my-3">
            <div className=" bg-gray-100 w-full flex justify-center items-center p-1 rounded-lg">
              <i className="fa fa-safari text-red-700 text-3xl"></i>
            </div>
            <h4 className="mt-2">خدمات</h4>
          </div>
          <div className=" w-28 flex justify-center items-center flex-col mx-6 my-3">
            <div className=" bg-gray-100 w-full flex justify-center items-center p-1 rounded-lg">
              <i className="fa fa-bluetooth text-red-700 text-3xl"></i>
            </div>
            <h4 className="mt-2">وسایل شخصی</h4>
          </div>
          <div className=" w-28 flex justify-center items-center flex-col mx-6 my-3">
            <div className=" bg-gray-100 w-full flex justify-center items-center p-1 rounded-lg">
              <i className="fa fa-xing text-red-700 text-3xl"></i>
            </div>
            <h4 className="mt-2">سرگرمی و فراغت</h4>
          </div>
          <div className=" w-28 flex justify-center items-center flex-col mx-6 my-3">
            <div className=" bg-gray-100 w-full flex justify-center items-center p-1 rounded-lg">
              <i className="fa fa-save text-red-700 text-3xl"></i>
            </div>
            <h4 className="mt-2">اجتماعی</h4>
          </div>
          <div className=" w-28 flex justify-center items-center flex-col mx-6 my-3">
            <div className=" bg-gray-100 w-full flex justify-center items-center p-1 rounded-lg">
              <i className="fa fa-random text-red-700 text-3xl"></i>
            </div>
            <h4 className="mt-2">تجهیزات صنعتی</h4>
          </div>
          <div className=" w-28 flex justify-center items-center flex-col mx-6 my-3">
            <div className=" bg-gray-100 w-full flex justify-center items-center p-1 rounded-lg">
              <i className="fa fa-ravelry text-red-700 text-3xl"></i>
            </div>
            <h4 className="mt-2">استخدام</h4>
          </div>
        </section>

        <section className="mx-4">
          <section className="my-5">
            <h6 className="text-gray-500 text-xs">
              دیوار تهران : انواع آگهی ها و خدمات در تهران
            </h6>
          </section>

          <section className="flex flex-wrap">
              <AdvertisementList/>
          </section>
        </section>
      </main>
    </section>
  );
};

export default Home;
