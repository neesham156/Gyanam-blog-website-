import { Select, Option } from "@material-tailwind/react";
import React, { useState } from "react";
import Image from "next/image";
import dbConnect, { Jsonify } from "database/database";
import Category from "@/models/Category";
import Blog from "@/models/Blog";
import { getSession } from "next-auth/react";
import moment from "moment";
import router, { useRouter } from "next/router";
import { Console } from "console";
export async function getServerSideProps(context:any){
  
  dbConnect()
  const a=await Category.find({});
 
  let session=await getSession(context);
  console.log(session)

 console.log(a)
  
  


  const blog=await Blog.aggregate([{$match:{author:session?.user?.name}},
  {$project:{_id:0,is_active:0,__v:0}}]);
 

  return {
    props:{
      session:Jsonify(session),
      cat:Jsonify(a),
      blog:Jsonify(blog),
     
      
    },
  };

}

export default function AllBlogs({cat,blog,session}:any) {
  const router=useRouter();
  const [data,setData]=useState<any>({
    category:"ALL"
  }
)

console.log("hb",blog)
console.log("hb",session)


  return (
    <div className=" ">
      <div className="rounded-lg w-full  h-[89vh] bg-white bg-opacity-100 ">
        <div className="flex justify-between p-4 border-b  border-gray-400 ">
          <div className=" ">
            
            <Select variant="outlined" label={data.category}  value={data.category} onChange={(e)=>
            setData({
              category:e,
            })} > 
            <Option value="ALL">ALL</Option>



            {cat.map((e:any)=>
            <>
            <Option value={e.slug}>{e.category_name}</Option>
            </>)}
           
            </Select>
          </div>
          <div className="text-blue-gray-500 text-sm">
            {/* <p>About 7500 Result</p> */}
          </div>
        </div>
        <div className="p-2 flex  w-full h-[79vh] flex-wrap overflow-auto ">
          {/* <div className="w-full md:w-1/2 bg-gray-200 rounded-xl my-2  h-1/2  flex ">
         
           
              <Image
                src="/favicon.ico"
                alt="Picture of the author"
                className="rounded-lg bg-white w-16 md:w-16 m-2 "
                width={50}
                height={50}
              />
        
            <div className= "ml-2 text-black">
           <h1 className="text-lg " > hello my name is</h1>
           <div>11-12-11</div>
            </div>
          </div> */}
          {blog.map((e:any)=><>
          {e.category==data.category? (<>
            <div className="flex  rounded-lg  mx-2   lg:w-[48%] bg-gray-300 mb-2 cursor-pointer" onClick={()=>router.push(`/${e.slug}`)}>
            <Image
              src="/mee.jpg"
              alt="Picture of the author"
              className="rounded-lg bg-white w-36 md:w-40 m-2 "
              width={500}
              height={500}
            />

            <div className="  w-full   px-3 mt-2 mb-6 md:mb-0 mr-auto">
              <h5 className="text-lg font-bold mb-3">{e.title}</h5>
              <div className="mb-3 text-red-600 font-medium text-sm flex items-center  md:justify-start">
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm82.29 357.6c-3.9 3.88-7.99 7.95-11.31 11.28-2.99 3-5.1 6.7-6.17 10.71-1.51 5.66-2.73 11.38-4.77 16.87l-17.39 46.85c-13.76 3-28 4.69-42.65 4.69v-27.38c1.69-12.62-7.64-36.26-22.63-51.25-6-6-9.37-14.14-9.37-22.63v-32.01c0-11.64-6.27-22.34-16.46-27.97-14.37-7.95-34.81-19.06-48.81-26.11-11.48-5.78-22.1-13.14-31.65-21.75l-.8-.72a114.792 114.792 0 0 1-18.06-20.74c-9.38-13.77-24.66-36.42-34.59-51.14 20.47-45.5 57.36-82.04 103.2-101.89l24.01 12.01C203.48 89.74 216 82.01 216 70.11v-11.3c7.99-1.29 16.12-2.11 24.39-2.42l28.3 28.3c6.25 6.25 6.25 16.38 0 22.63L264 112l-10.34 10.34c-3.12 3.12-3.12 8.19 0 11.31l4.69 4.69c3.12 3.12 3.12 8.19 0 11.31l-8 8a8.008 8.008 0 0 1-5.66 2.34h-8.99c-2.08 0-4.08.81-5.58 2.27l-9.92 9.65a8.008 8.008 0 0 0-1.58 9.31l15.59 31.19c2.66 5.32-1.21 11.58-7.15 11.58h-5.64c-1.93 0-3.79-.7-5.24-1.96l-9.28-8.06a16.017 16.017 0 0 0-15.55-3.1l-31.17 10.39a11.95 11.95 0 0 0-8.17 11.34c0 4.53 2.56 8.66 6.61 10.69l11.08 5.54c9.41 4.71 19.79 7.16 30.31 7.16s22.59 27.29 32 32h66.75c8.49 0 16.62 3.37 22.63 9.37l13.69 13.69a30.503 30.503 0 0 1 8.93 21.57 46.536 46.536 0 0 1-13.72 32.98zM417 274.25c-5.79-1.45-10.84-5-14.15-9.97l-17.98-26.97a23.97 23.97 0 0 1 0-26.62l19.59-29.38c2.32-3.47 5.5-6.29 9.24-8.15l12.98-6.49C440.2 193.59 448 223.87 448 256c0 8.67-.74 17.16-1.82 25.54L417 274.25z"
                  />
                </svg>
            {e.category}
              </div>
              <p className="text-gray-500 mb-6">
              <small>
                    Published <u> {moment(
                        e?.createdAt
                      ).format("D MMM YY")}</u> 
                   
                  </small>
              </p>
              <p className="text-gray-500">
                  {e.description.slice(0,300)}
              
                </p>
            </div>
          </div>
</>):data.category=="ALL" ?(<> 
  <div className="flex  rounded-lg  mx-2  lg:w-[48%] bg-gray-300 mb-2 cursor-pointer" onClick={()=>router.push(`/${e.author}/${e.slug}`)}>
            <Image
              src="/mee.jpg"
              alt="Picture of the author"
              className="rounded-lg bg-white w-36 md:w-40 m-2 "
              width={500}
              height={500}
            />

            <div className="  w-full   px-3 mt-2 mb-6 md:mb-0 mr-auto">
              <h5 className="text-lg font-bold mb-3">{e.title}</h5>
              <div className="mb-3 text-red-600 font-medium text-sm flex items-center  md:justify-start">
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm82.29 357.6c-3.9 3.88-7.99 7.95-11.31 11.28-2.99 3-5.1 6.7-6.17 10.71-1.51 5.66-2.73 11.38-4.77 16.87l-17.39 46.85c-13.76 3-28 4.69-42.65 4.69v-27.38c1.69-12.62-7.64-36.26-22.63-51.25-6-6-9.37-14.14-9.37-22.63v-32.01c0-11.64-6.27-22.34-16.46-27.97-14.37-7.95-34.81-19.06-48.81-26.11-11.48-5.78-22.1-13.14-31.65-21.75l-.8-.72a114.792 114.792 0 0 1-18.06-20.74c-9.38-13.77-24.66-36.42-34.59-51.14 20.47-45.5 57.36-82.04 103.2-101.89l24.01 12.01C203.48 89.74 216 82.01 216 70.11v-11.3c7.99-1.29 16.12-2.11 24.39-2.42l28.3 28.3c6.25 6.25 6.25 16.38 0 22.63L264 112l-10.34 10.34c-3.12 3.12-3.12 8.19 0 11.31l4.69 4.69c3.12 3.12 3.12 8.19 0 11.31l-8 8a8.008 8.008 0 0 1-5.66 2.34h-8.99c-2.08 0-4.08.81-5.58 2.27l-9.92 9.65a8.008 8.008 0 0 0-1.58 9.31l15.59 31.19c2.66 5.32-1.21 11.58-7.15 11.58h-5.64c-1.93 0-3.79-.7-5.24-1.96l-9.28-8.06a16.017 16.017 0 0 0-15.55-3.1l-31.17 10.39a11.95 11.95 0 0 0-8.17 11.34c0 4.53 2.56 8.66 6.61 10.69l11.08 5.54c9.41 4.71 19.79 7.16 30.31 7.16s22.59 27.29 32 32h66.75c8.49 0 16.62 3.37 22.63 9.37l13.69 13.69a30.503 30.503 0 0 1 8.93 21.57 46.536 46.536 0 0 1-13.72 32.98zM417 274.25c-5.79-1.45-10.84-5-14.15-9.97l-17.98-26.97a23.97 23.97 0 0 1 0-26.62l19.59-29.38c2.32-3.47 5.5-6.29 9.24-8.15l12.98-6.49C440.2 193.59 448 223.87 448 256c0 8.67-.74 17.16-1.82 25.54L417 274.25z"
                  />
                </svg>
            {e.category}
              </div>
              <p className="text-gray-500 mb-6">
              <small>
                    Published <u> {moment(
                        e?.createdAt
                      ).format("DD-MM-YY")}</u> 
                   
                  </small>
              </p>
              <p className="text-gray-500">
                  {e.description.slice(0,300)}
              
                </p>
            </div>
          </div>
          </>):(<></>)}

         

          </>)}



        </div>
      </div>
    </div>
  );
}
