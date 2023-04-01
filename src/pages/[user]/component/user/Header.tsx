import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { CgLogOut, CgProfile } from "react-icons/Cg";
import { CiEdit } from "react-icons/Ci";
import { FcHome } from "react-icons/Fc";
import { HiOutlineClipboardList, HiOutlinePencil } from "react-icons/Hi";
import { useRouter } from "next/router";

export default function Header() {
  const { data: session, status } = useSession();
  let a = session?.user?.name;
  a = a?.toLowerCase().replace(/\s+/g, "_");

  const router = useRouter();
  return (
    <div className="flex justify-between">
      <div className="mx-4">
        <i
          className=" text-4xl cursor-pointer "
          onClick={() => router.push("/")}
        >
          <FcHome />
        </i>
      </div>
      <div className="text-4xl font-bold text-gray-700  ">
        <h1 className="bg-gradient-to-r from-gray-800 via-gray-300 to-gray-700 ... inline-block text-transparent bg-clip-text">
          GYANAM
        </h1>
      </div>
      <div className="flex  items-center gap-20">
        <div
          className="  flex items-center gap-1 text-blue-gray-900 text-lg text-center cursor-pointer"
          onClick={() => router.push(`/${a}/create`)}
        >
          <i className="">
            <HiOutlinePencil />
          </i>
          <h1 className="  ">create</h1>
        </div>
        <div>
          <Menu>
            <MenuHandler>
              <div className="rounded-full  w-8  curser-pointer   mr-4">
                <Image
                  data-ripple-light="true"
                  data-popover-target="menu"
                  src="/rr+.jpg"
                  className="rounded-full  "
                  alt="Avatar"
                  width={500}
                  height={500}
                />
              </div>
            </MenuHandler>
            <MenuList>
              <MenuItem
                className=" flex gap-3"
                onClick={() => router.push(`/${a}/profile`)}
              >
                {" "}
                <i className="">
                  <CgProfile />
                </i>
                My Profile
              </MenuItem>
              <MenuItem
                className=" flex gap-3"
                onClick={() => router.push(`/${a}/editprofile`)}
              >
                <i>
                  <CiEdit />
                </i>
                Edit Profile
              </MenuItem>
              <MenuItem
                className=" flex gap-3"
                onClick={() => router.push(`/${a}/myblog`)}
              >
                <i>
                  <HiOutlineClipboardList />
                </i>
                My Blog
              </MenuItem>
              <MenuItem
                className=" flex gap-3"
                onClick={() =>
                  signOut().then(() => {
                    router.push("/login");
                  })
                }
              >
                <i>
                  <CgLogOut />
                </i>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
}
