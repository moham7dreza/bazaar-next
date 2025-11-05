import Link from "next/link";
import React from "react";

const PanelSidebar = () => {
  return (
    <aside className="w-1/6 bg-rose-950 text-white h-screen  flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">پنل مدیریت</h1>
      </div>
      <nav className="space-y-1 flex-1 flex flex-col  text-white text-lg">
        <Link href="/" className="hover:bg-rose-900">
          <span className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:text-white hover:bg-rose-900 transition-colors">
            <i className="fa fa-home me-2 !text-lg text-rose-100"></i>
            <span className="text-white text-lg font-bold hover:text-rose-100">
              خانه
            </span>
          </span>
        </Link>
        <Link href="/panel" className="hover:bg-rose-900">
          <span className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:text-white hover:bg-rose-900 transition-colors">
            <i className="fa fa-home me-2 !text-lg text-rose-100"></i>
            <span className="text-white text-lg font-bold hover:text-rose-100">
              داشبورد
            </span>
          </span>
        </Link>
        <Link href="/panel/ads" className="hover:bg-rose-900">
          <span className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:text-white hover:bg-rose-900 transition-colors">
            <i className="fa fa-newspaper-o me-2 !text-lg text-rose-100"></i>
            <span className="text-white text-lg font-bold hover:text-rose-100">
              آگهی ها
            </span>
          </span>
        </Link>
      </nav>
    </aside>
  );
};

export default PanelSidebar;
