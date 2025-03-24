import Image from "next/image";
import React from "react";

const Ads = () => {
  return (
    <main className="container mb-20 lg:mb-5 lg:px-40">
      <section className="lg:flex">
        <section className="px-4 pt-12 lg:w-1/2 lg:order-2">
          <div>
            <Image
              src={"/images/1.jpg"}
              alt="ads-img"
              className="rounded"
              width={700}
              height={300}
            />
          </div>
          <div className="hidden lg:block">
            <textarea
              name=""
              defaultValue=" یادداشت های شما..."
              id=""
              rows="5"
              className="border border-gray-300 w-full mt-6 rounded text-gray-400 p-4 resize-none"
            ></textarea>
            <small className="text-gray-500">
              یادداشت تنها برای شما قابل دیدن است و پس از حذف آگهی، پاک خواهد
              شد.
            </small>
          </div>
        </section>

        <section className="lg:w-1/2 lg:order-1">
          <section className="flex my-4 px-4 space-x-2 space-x-reverse text-gray-500 text-sm">
            <div>
              <i className="fa fa-angle-right"></i>
            </div>
            <div>
              <h6>مبلمان اداری</h6>
            </div>
          </section>

          <section className="px-4">
            <div className="text-2xl">
              <h2>مبلمان اداری فروش</h2>
            </div>
            <div className="text-gray-500 text-sm mt-2">
              <h6>دقایقی پیش در جمهوری</h6>
            </div>
          </section>

          <section className="px-2 flex justify-between border-t w-11/12 mx-auto my-5 py-3 border-b">
            <div className="flex space-x-reverse space-x-3">
              <div>
                <i className="fa fa-warning text-gray-500"></i>
              </div>
              <div>
                <h4>زنگ خطر های قبل از معامله</h4>
              </div>
            </div>
            <div>
              <i className="fa fa-angle-left"></i>
            </div>
          </section>

          <section className="hidden lg:flex justify-between pb-5 pt-1 px-7">
            <section className="flex justify-center items-center space-x-3 space-x-reverse">
              <div>
                <button className="bg-red-800 text-white px-10 py-2 rounded">
                  اطلاعات تماس
                </button>
              </div>
              <div>
                <button className=" text-gray-500 px-14 border border-gray-500 py-2 rounded">
                  چت
                </button>
              </div>
            </section>
            <section className="flex space-x-10 space-x-reverse">
              <div>
                <i className="fa fa-save text-2xl"></i>
              </div>
              <div>
                <i className="fa fa-dashcube text-2xl"></i>
              </div>
            </section>
          </section>

          <section className="px-2 flex divide-x-2 divide-x-reverse justify-center items-start flex-wrap space-y-4 space-y-reverse">
            <div className="flex flex-col justify-center items-center w-1/3">
              <div>
                <h6>کارکرد</h6>
              </div>
              <div>
                <h3 className="font-extrabold">200,000</h3>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/3">
              <div>
                <h6>کارکرد</h6>
              </div>
              <div>
                <h3 className="font-extrabold">200,000</h3>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/3">
              <div>
                <h6>کارکرد</h6>
              </div>
              <div>
                <h3 className="font-extrabold">200,000</h3>
              </div>
            </div>
          </section>

          <section>
            <section className="px-2 flex justify-between border-t w-11/12 mx-auto py-3 border-b">
              <div>
                <h4 className="text-gray-500">نوع سوخت</h4>
              </div>
              <div>
                <h4>بنزینی</h4>
              </div>
            </section>
            <section className="px-2 flex justify-between w-11/12 mx-auto py-3 border-b">
              <div>
                <h4 className="text-gray-500">نوع سوخت</h4>
              </div>
              <div>
                <h4>بنزینی</h4>
              </div>
            </section>
            <section className="px-2 flex justify-between w-11/12 mx-auto py-3 border-b">
              <div>
                <h4 className="text-gray-500">نوع سوخت</h4>
              </div>
              <div>
                <h4>بنزینی</h4>
              </div>
            </section>
            <section className="px-2 flex justify-between w-11/12 mx-auto py-3 border-b">
              <div>
                <h4 className="text-gray-500">نوع سوخت</h4>
              </div>
              <div>
                <h4>بنزینی</h4>
              </div>
            </section>
          </section>

          <section className="p-5">
            <h4 className="text-xl mb-2">توضیحات</h4>
            <p>
              لیفان ۸۲۰مدل ۹۷
              <br />
              بی رنگ و ضربه
              <br />
              کف خواب اسپرت
              <br />
              رینگ ۸۰ میلیونی
              <br />
              بوق ۲۰ میلیونی
              <br />
              بیمه بدنه دارد
              <br />
              خیلی لاکچری در حد صفر
            </p>
          </section>

          <section className="p-5 flex space-x-4 space-x-reverse flex-wrap">
            <a className="bg-gray-100 text-gray-500 px-4 py-1">سواری و وانت</a>
            <a className="bg-gray-100 text-gray-500 px-4 py-1">سواری و وانت</a>
          </section>
        </section>
      </section>

      <section className="lg:w-1/2 lg:ms-auto">
        <section className="flex justify-between p-5 lg:p-0 lg:px-10">
          <div>
            <h5>بازخورد شما درباره این آگهی چیست</h5>
          </div>
          <div className="flex space-x-6 space-x-reverse">
            <div>
              <a href="">
                <i className="fa fa-thumbs-o-down text-gray-500 text-xl"></i>
              </a>
            </div>
            <div>
              <a href="">
                <i className="fa fa-thumbs-o-up text-gray-500 text-xl"></i>
              </a>
            </div>
          </div>
        </section>

        <section className="px-2 flex justify-between w-11/12 mx-auto my-5 py-3 border-b">
          <div className="flex space-x-reverse space-x-3">
            <div>
              <i className="fa fa-info-circle text-gray-500"></i>
            </div>
            <div>
              <h4>گزارش کلاهبرداری و رفتار مشکوک</h4>
            </div>
          </div>
          <div>
            <i className="fa fa-angle-left"></i>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Ads;
