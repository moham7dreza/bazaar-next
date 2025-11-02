import Image from "next/image";
import React from "react";
import Link from "next/link";
import AdRegisterButton from "@/app/components/ui/home/AdRegisterButton";
import LoginRegisterButton from "@/app/components/ui/home/LoginRegisterButton";
import {AuthProvider} from "@/app/contexts/AuthContext";
import SearchFilters from "@/app/components/ui/home/SearchFilters";

const MainHeader = () => {
  return (
    <div>
      <AuthProvider>
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
                  <Link href={'/'}>
                      <Image
                          className="w-14 h-14"
                          src={"/images/logo.png"}
                          alt="logo"
                          width={60}
                          height={60}
                      />
                  </Link>
              </section>

              <SearchFilters/>

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
                  <LoginRegisterButton/>
              </section>

              <section className="hidden lg:flex text-gray-500">
                  <AdRegisterButton/>
              </section>
          </header>
      </AuthProvider>
    </div>
  );
};

export default MainHeader;
