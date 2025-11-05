import React from "react";
import UserAdsList from "@/app/components/ui/panel/UserAdsList";

const UserAdsPage = () => {
  return (
    <div className="p-6">
      <div className="bg-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold">آگهی ها</h1>
        <p>لیست آگهی های شما در سایت. هر آگهی میتواند تا ۱۰ عکس داشته باشد.</p>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <UserAdsList />
      </div>
    </div>
  );
};

export default UserAdsPage;
