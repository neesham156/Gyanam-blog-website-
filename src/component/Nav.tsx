import { useState, useEffect } from "react";
import Image from 'next/image'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { HiOutlineClipboardList, HiOutlinePencil } from "react-icons/Hi";
import { CgLogOut, CgProfile } from "react-icons/Cg";
import { CiEdit } from "react-icons/Ci";
import { FcHome } from "react-icons/Fc";

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();
  let a = session?.user?.name;
  a=a?.toLowerCase().replace(/\s+/g,'_');

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // const navList = (
  //   <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <a href="#" className="flex items-center">
  //         Pages
  //       </a>
  //     </Typography>
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <a href="#" className="flex items-center">
  //         Account
  //       </a>
  //     </Typography>
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal " 
  //       onClick={()=>router .push("/user/create")}
  //     >
      
  //        Create
     
  //     </Typography>
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <a href="#" className="flex items-center">
  //         Docs
  //       </a>
  //     </Typography>
  //   </ul>
  // );

  return (
    <Navbar className="mx-auto max-w-screen-xl   py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
      
      <div className="mx-4">
        <i
          className=" text-4xl cursor-pointer "
          onClick={() => router.push("/")}
        >
          <FcHome />
        </i>
      </div>
      <div className="text-2xl font-bold text-gray-700  ">
        <h1 className="bg-gradient-to-r from-gray-800 via-gray-300 to-gray-700 ... inline-block text-transparent bg-clip-text">
          GYANAM
        </h1>
      </div>
        {/* <div className="hidden lg:block">{navList}</div> */}
        {session ? (
          // <Button
          //   variant="gradient"
          //   size="sm"
          //   className="hidden lg:inline-block"
          //   onClick={() =>
          //     signOut().then(() => {
          //       router.push("/login");
          //     })
          //   }
          // >
          //   <span>Log Out</span>
          // </Button>
          <div className="flex justify-between ">
    <div></div>
    <div className="flex  items-center gap-20">
    <div className="  flex items-center gap-1 text-blue-gray-900 text-lg text-center cursor-pointer" onClick={()=> router.push(`/${a}/create`)}>
    <i className=""><HiOutlinePencil/></i>   
    <h1 className="  " >create</h1>
    </div>
    <div>
    <Menu  >
    <MenuHandler  >
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
        <MenuItem  className=" flex gap-3" onClick={()=>router.push(`/${a}/profile`)}>  <i className="">
          <CgProfile />
        </i>My Profile</MenuItem>
        <MenuItem className=" flex gap-3"onClick={()=>router.push(`/${a}/editprofile`)}><i><CiEdit/></i>Edit Profile</MenuItem>
        <MenuItem className=" flex gap-3" onClick={()=>router.push(`/${a}/myblog`)}><i><HiOutlineClipboardList/></i>My Blog</MenuItem>
        <MenuItem className=" flex gap-3" onClick={() =>
              signOut().then(() => {
                router.push("/login");
              })
            } ><i><CgLogOut/></i>Log Out</MenuItem>
      </MenuList>
    </Menu>
    </div>
    
    </div>

  
    </div>

        ) : (
          <Button
            variant="gradient"
            size="sm"
            className=""
            onClick={() => router.push("/login")}
          >
            <span>Login</span>
          </Button>
        )}

        {/* <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton> */}
      </div>
      {/* <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button
            variant="gradient"
            size="sm"
            fullWidth
            className="mb-2"
            onClick={() => router.push("/login")}
          >
            <span>Login</span>
          </Button>
        </div>
      </MobileNav> */}
    </Navbar>
  );
}
