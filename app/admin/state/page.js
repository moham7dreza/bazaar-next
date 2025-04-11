import React from "react";
import Link from "next/link";
import StateList from "./StateList";

const StatePage = async () => {
  let states;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertise/state`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("خطا در دریافت اطلاعات");
    }

    states = await res.json();

    if (!states.status) {
      throw new Error("خطا در دریافت اطلاعات");
    }
  } catch (err) {
    console.log(err);
  }
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">لیست مناطق</h1>

      <div>
        <Link
          href={"/admin/state/create"}
          className="bg-blue-500 text-white px-4 py-2 inline-block rounded-md hover:bg-blue-600 mb-4"
        >
          ساخت
        </Link>
      </div>
      <StateList states={states} />
    </div>
  );
};

export default StatePage;
