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
        href="/admin"
        className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
      >
        <i className="fa fa-home"></i>
        <span>داشبورد</span>
      </Link>
      <Link
        href="/admin"
        className="text-[var(--text-color)] flex items-center space-x-2 space-x-reverse p-2 hover:bg-[var(--hover-bg)] rounded-md transition-all"
      >
        <i className="fa fa-home"></i>
        <span>داشبورد</span>
      </Link>
    </nav>
  );
};

export default Sidebar;
