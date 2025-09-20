import React from "react";
import StateEditForm from "./StateEditForm";

async function getState(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertise/state/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("خطایی در دریافت اطلاعات");
  return res.json();
}

async function getStates() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/advertise/state`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "force-cache",
    }
  );
  if (!response.ok) throw new Error("خطایی در دریافت اطلاعات");

  return response.json();
}

const StateEditPage = async ({ params }) => {
  let { id } = await params;
  const state = await getState(id);
  const states = await getStates();
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">ویرایش منطقه </h1>
      <StateEditForm state={state.data} states={states.data} />
    </div>
  );
};

export default StateEditPage;
