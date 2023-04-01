import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";

export default function UserLayout({ children }: any) {
  return (
    <>
      <main className=" w-screen h-screen bg-blue-gray-900 bg-opacity-50 px-2 py-2">
        <div className="w-full py-3 rounded-lg shadow-2xl bg-white h-2/12">
          <Header />
        </div>
        <div className="w-full flex  px-2 h-[91vh] gap-2 ">
          <div className="w-2/12 bg-white    md: my-2  rounded-lg shadow-xl  hidden md:block">
            <SideBar />
          </div>
          <div className="w-full my-2   rounded-lg shadow-xl  ">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
