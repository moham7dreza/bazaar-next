import React from "react";
import Image from "next/image";

export const Header = () => {
    return (
        <header>
            <section className="container flex justify-center items-center">
                <Image src="/images/logo.png" width={100} height={100} alt="logo" className="w-24 h-24"/>
            </section>

            <section className="border-b">
                <nav
                    className="container flex justify-around items-center space-x-1 space-x-reverse text-gray-500 text-xs md:text-sm lg:text-lg font-light pb-4 px-8">
                    <a href="">ثبت آگهی</a>
                    <a href="">درباره دیوار</a>
                    <a href="">دریافت برنامه</a>
                    <a href="">اتاق خبر</a>
                    <a href="">پشتیبانی</a>
                </nav>
            </section>
        </header>
    )
}
