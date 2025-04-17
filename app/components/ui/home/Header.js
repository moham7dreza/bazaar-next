import Image from "next/image";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <section className="container flex justify-center items-center">
        <Image
          src="/images/logo.png"
          width={50}
          height={50}
          className="w-24 h-24"
          alt="logo"
        />
      </section>

      <section className="border-b">
        <nav className="container flex justify-around items-center space-x-1 space-x-reverse text-gray-500 text-xs md:text-sm lg:text-lg font-light pb-4 px-8">
          <Link href="/admin">ثبت آگهی</Link>
          <a href="">درباره دیوار</a>
          <a href="">دریافت برنامه</a>
          <a href="">اتاق خبر</a>
          <a href="">پشتیبانی</a>
        </nav>
      </section>
    </header>
  );
};

export default Header;
