import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <nav className="flex flex-col mt-3 space-y-4">
      <Link
        href="/admin"
        className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
      >
        <i className="fa fa-home"></i>
        <span>داشبورد</span>
      </Link>
      <Link
        href="/admin/category"
        className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
      >
        <i className="fa fa-ra"></i>
        <span>دسته بندی ها</span>
      </Link>
      <Link
        href="/admin/menu"
        className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
      >
        <i className="fa fa-home"></i>
        <span>منو</span>
      </Link>
        <Link
        href="/admin/page"
        className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
      >
        <i className="fa fa-paperclip"></i>
        <span>صفحه ها</span>
      </Link>
        <Link
        href="/admin/state"
        className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
      >
        <i className="fa fa-map"></i>
        <span>منطقه</span>
      </Link>
        <Link
        href="/admin/category-attribute"
        className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
      >
        <i className="fa fa-map"></i>
        <span>ویژگی دسته ها</span>
      </Link>

        <div className="border border-gray-700"></div>

        <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/`}
            className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
        >
            <i className="fa fa-server"></i>
            <span>بکند</span>
        </a>
        <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/docs/api`}
            className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
        >
            <i className="fa fa-book"></i>
            <span>مستندات API</span>
        </a>
        <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/chatify`}
            className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
        >
            <i className="fa fa-telegram"></i>
            <span>چتیفای</span>
        </a>
        <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/super-admin`}
            className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
        >
            <i className="fa fa-user-secret"></i>
            <span>پنل سوپر ادمین</span>
        </a>
        <a
            href={'https://github.com/moham7dreza'}
            className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
        >
            <i className="fa fa-github"></i>
            <span>گیت هاب</span>
        </a>
    </nav>
  );
};

export default Sidebar;
