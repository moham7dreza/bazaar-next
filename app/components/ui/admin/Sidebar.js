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

        <div className="border border-gray-700"></div>

        <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/docs/api`}
            target='_blank'
            className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
        >
            <i className="fa fa-book"></i>
            <span>مستندات API</span>
        </a>
        <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/health?fresh`}
            target='_blank'
            className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
        >
            <i className="fa fa-wrench"></i>
            <span>پنل سلامت بکند</span>
        </a>
        <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/log-viewer`}
            target='_blank'
            className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
        >
            <i className="fa fa-braille"></i>
            <span>لاگینگ</span>
        </a>
    </nav>
  );
};

export default Sidebar;
