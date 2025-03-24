import React from "react";
import Sidebar from "../components/ui/admin/Sidebar";
import Header from "../components/ui/admin/Header";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/6 bg-[var(--sidebar-bg)] text-[var(--text-color)] p-4">
        <Sidebar />
      </div>

      <div className="w-5/6 p-4">
        <Header />
        <main className="content">
          <h4>به پنل ادمین خوش آمدید</h4>
          <p>در این قسمت میتوانید پنل ادمین خود را مدیریت نمایید.</p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
