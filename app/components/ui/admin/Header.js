import React from "react";

const Header = () => {
  return (
    <header>
      <nav className="flex justify-between items-center p-4 bg-[var(--primary-bg)] text-[var(--text-color)]">
        <div>
          <h1 className="text-2xl font-bold">پنل مدیریت</h1>
        </div>
        <div>
          <button className="bg-[var(--highlight-color)] text-white px-4 py-2 rounded-md">
            خروج
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
