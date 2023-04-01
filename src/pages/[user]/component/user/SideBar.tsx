import React from "react";
import { CgLogOut, CgProfile } from "react-icons/Cg";
import { FiSettings } from "react-icons/Fi";
import { BsAppIndicator, BsFilterLeft } from "react-icons/Bs";
import { RxCross2 } from "react-icons/Rx";
import { RiDraftLine } from "react-icons/Ri";
import { useRouter } from "next/router";
import { CiSaveDown2 } from "react-icons/Ci";
import { HiOutlineClipboardList } from "react-icons/Hi";
import { signOut, useSession } from "next-auth/react";


export default function SideBar() {
  const { data: session, status } = useSession();
  let a = session?.user?.name;
  a=a?.toLowerCase().replace(/\s+/g,'_');
  const openSidebar = () => {
    console.log("hey");
    document.querySelector(".sidebar")?.classList.toggle("hidden");
  };
  const dropdown = () => {
    console.log("by");
    document.querySelector("#submenu")?.classList.toggle("hidden");
    document.querySelector("#arrow")?.classList.toggle("rotate-0");
  };
  const router = useRouter();
  return (
    <div className="">
      {/* <body className=" ">
        <span
          className=" text-black  flex justify-center items-center text-4xl    cursor-pointer"
          onClick={() => openSidebar()}
        >
          <i className="bi bi-filter-left px-2  rounded-md"><BsFilterLeft/> </i>
        </span>
        <div className="sidebar fixed  top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-blue-gray-300">
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600">
                <BsAppIndicator />{" "}
              </i>
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">
                Gyanam
              </h1>
              <i
                className="bi bi-x cursor-pointer  ml-28 md:hidden "
                onClick={() => openSidebar()}
              >
                <RxCross2 />
              </i>
            </div>
            <div className="my-2 bg-gray-600 h-[1px]"></div>
          </div>
          <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
            <i className="bi bi-search text-sm"></i>
            <input
              type="text"
              placeholder="Search"
              className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-house-door-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Home
            </span>
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-bookmark-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Bookmark
            </span>
          </div>
          <div className="my-4 bg-gray-600 h-[1px]"></div>
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={() => dropdown()}
          >
            <i className="bi bi-chat-left-text-fill"></i>
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Chatbox
              </span>
              <span className="text-sm rotate-180" id="arrow">
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          <div
            className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
            id="submenu"
          >
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Social
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Personal
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Friends
            </h1>
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Logout
            </span>
          </div>
        </div>
      </body> */}

      <div className="flex justify-start p-2  items-center  gap-2  text-center rounded-lg shadow-xl   mt-4 py-1 text-sm  md:text-lg text-black font-semibold  bg-teal-50 cursor-pointer hover:bg-blue-gray-300  " onClick={()=> router.push(`/${a}/profile`)}>
        <i className="">
          <CgProfile />
        </i>
        <h1> Profile</h1>
      </div>
      {/* <div className="flex justify-start p-2 items-center  gap-2  text-center rounded-lg shadow-xl  mt-4 py-1 text-sm md:text-lg text-black font-semibold  bg-blue-gray-100 hover:bg-blue-gray-300  ">
        <i className="">
          <CiSaveDown2 />
        </i>
        <h1> Saved Article</h1>
      </div> */}
      <div className="flex justify-start items-center p-2 gap-2  rounded-lg shadow-xl  mt-4 py-1 text-sm md:text-lg text-black font-semibold  bg-blue-gray-100 hover:bg-blue-gray-300 cursor-pointer " onClick={()=>router.push(`/${a}/myblog`)}>
      <i><HiOutlineClipboardList/></i>
        <h1> My Blog</h1>
      </div>
      <div className="flex justify-start items-center p-2 gap-2  rounded-lg shadow-xl  mt-4 py-1 text-sm md:text-lg text-black font-semibold  bg-blue-gray-100 hover:bg-blue-gray-300  ">
        <i className="">
          <RiDraftLine />
        </i>
        <h1> Draft</h1>
      </div>
      {/* <div className="flex justify-start items-center p-2 gap-2  rounded-lg shadow-xl  mt-4 py-1 text-sm md:text-lg text-black font-semibold  bg-blue-gray-100 hover:bg-blue-gray-300  ">
        <i className="">
          <CgProfile />
        </i>
        <h1> </h1>
      </div> */}
      <div className="flex justify-start items-center p-2 gap-2  rounded-lg shadow-xl  mt-4 py-1 text-sm md:text-lg text-black font-semibold  bg-blue-gray-100 hover:bg-blue-gray-300  cursor-pointer " onClick={()=>signOut().then(()=>router.push("/login"))}>
        <i className="">
          <CgLogOut />
        </i>
        <h1> Log Out</h1>
      </div>
      <div className="flex justify-start  items-center p-2 gap-2  rounded-lg shadow-xl  mt-4 py-1 text-sm md:text-lg text-black font-semibold  bg-blue-gray-100 hover:bg-blue-gray-300  ">
        <i className="">
          <FiSettings />
        </i>
        <h1> Setting</h1>
      </div>
    </div>
  );
}
3;
