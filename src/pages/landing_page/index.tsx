/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Content from "@/component/content";
import Navbarr from "@/component/navbarr";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import dbConnect, { Jsonify } from "database/database";
import moment from "moment";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
export async function getServerSideProps(context: any) {
  dbConnect();
  const a = await Category.find({});

  let session = await getSession(context);

  // const blog=await Blog.find({author: session?.user?.email});
  const blog = await Blog.find({}).limit(3);
  return {
    props: {
      cat: Jsonify(a),
      blog: Jsonify(blog),
    },
  };
}

export default function landing_page({ cat, blog }: any) {
  // var count = 0;
  // let start = 0;
  // let end = 5;
  // let a = blog.length / 5;
  // const [i, setI] = useState<any>(1);
  // const[arr,setArr]=useState<any>();
  // useEffect(()=>{
  //   axios
  //     .get(`/api/blog?cate=${i-1}`)
  //     .then((res) => setArr(Jsonify(res.data.record)))
  //     .catch((err) => console.log(err));

  // },[i])
  // console.log(arr)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [startValue, setStartValue] = useState<any>(start);
  // const [limitValue, setLimitValue] = useState<any>(end);
  const [data, setData] = useState<any>({
    category: "ALL",
  });

//  console.log("start :-",startValue,"end:-",limitValue,"i:-",i);
  return (
    <>
      <div>
        <div className="w-full p-3">
          <Navbarr />
        </div>

        <div className="h-24">
          <div className="overflow-hidden">
            <img src="/GYANAM2.png" />
          </div>
          <Content data={blog} cat={cat}/>
          
            {/* {
            // arr?.length>0?
            arr?.map((item: any) => (
              <>
                <div className="flex justify-center">
                  <div className="rounded-lg shadow-lg bg-white w-[384px] h-[460px] ">
                    <a
                      href="#!"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        className="rounded-t-lg text-center text w-full bg-cover h-48"
                        src={item.image}
                        alt={item.title}
                      />
                    </a>
                    <div className="p-6  h-[248px]">
                      <h5 className="text-gray-900 text-xl font-medium mb-1  overflow-hidden h-[70px]">
                        {item.title}
                      </h5>
                      <p className="text-gray-700 text-sm mb-1  h-[90px]">
                        {item.description.slice(0, 180)}...
                      </p>
                      <p className="text-gray-600 text-xs mb-1   h-[16px]">
                        Last updated{" "}
                        {moment(item?.updateddAt).format("D MMM YY")} mins ago
                      </p>

                      <div className=" flex items-end   gap-3 h-[50px] ">
                        <img
                          src="hgh5kE5.jpg"
                          className="rounded-full h-[35px] w-[35px]"
                          alt=""
                        />
                        <div className="flex flex-col justify-top">
                          <span className="font-thin text-[13px]">
                            {item.author.toUpperCase()}
                          </span>
                          <span className="font-thin text-[12px] text-gray-400">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
            // :
            // (
            //  <>
            //  <div className="flex justify-center  items-center  w-[384px] h-[460px] text-4xl text-blue-gray-800 font-bold">
                 
            //         no data
                    
            //         </div>
            //  </>
            // )
          
          } */}

        

          {/* <div className="border-y border-gray-500  p-2 mb-6">
            <div className="flex justify-center p-2 ">
              <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                  {limitValue >= blog.length  }

                  <li
                    className={
                      i == 1 ? "hidden page-item" : "block page-item"
                    }
                  
                    onClick={(e) => {

                   
                      setI(i-1);
                    }}
                  >
                    <a
                      className="page-link relative block py-1.5 px-3 rounded-lg border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                      href="#"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo; </span>
                    </a>
                  </li>
                  <li
                    className="page-item "
             
                    onClick={(e) => {
                      // if (i == 1) {

                      // } 
                      // else{
                      //   setLimitValue(i * limitValue + 5);
                      //   setStartValue(i * startValue + 5);
                      //   setI(i);
                        
                      // }
                    }}
                  >
                    <a
                      className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded bg-gray-800 text-gray-100 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                      href="#"
                    >
                      {i}
                    </a>
                  </li>
                  <li className="page-item" onClick={(e) => {
                      // setLimitValue((i+1)*limitValue + 5);
                      // setStartValue((i+1)*startValue + 5);
                      setI(i+1); 
                    }}>
                    <a
                      className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                      href="#"
                    >
                      {i + 1}
                    </a>
                  </li>

                  <li className="page-item" onClick={(e) => {

                      // setLimitValue((i+2)*limitValue + 5);
                      // setStartValue((i+2)*startValue + 5);
                      setI(i+2); 
                    }}>
                    <a
                      className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                      href="#"
                    >
                      {i + 2}
                    </a>
                  </li>
                  <li className="page-item" onClick={(e) => {
                      // setLimitValue((i+3)*limitValue + 5);
                      // setStartValue((i+3)*startValue + 5);
                      setI(i+3); 
                    }}>
                    <a
                      className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                      href="#"
                    >
                      {i + 3}
                    </a>
                  </li>
                  <li className="page-item" onClick={(e) => {
                      // setLimitValue((i+4)*limitValue + 5);
                      // setStartValue((i+4)*startValue + 5);
                      setI(i+4); 
                    }}>
                    <a
                      className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                      href="#"
                    >
                      {i + 4}
                    </a>
                  </li>
                  <li
                    className={
              i >= arr?.length
                        ? "page-item hidden"
                        : "page-item block"
                    }
                    onClick={(e) => {
                    
                      setI(i+1);  
                    }}
                  >
                    <a
                      className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                      href="#"
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
