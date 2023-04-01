import Author from "@/models/Author";
import axios from "axios";
import { Input, Select, Option, Button } from "@material-tailwind/react";
import dbConnect, { Jsonify } from "database/database";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
export async function getServerSideProps(context: any) {
  dbConnect();

  let session = await getSession(context);

  const a = await Author.findOne({ email: session?.user?.email });

  return {
    props: {
      user: Jsonify(a),
    },
  };
}

export default function index({ user }: any) {
  console.log(user);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState<any>({
    name: user.name,
    slug: user.slug,
    gender: user.gender,
    email:user.email,
    password:user.password,
    education: user.education,
    phone_no: user.phone_no,
    address: user.address,
  });
console.log(data)
const handleSubmit=async(values:any)=>{
  console.log("values",values);
  axios.put(`/api/author`,values).then((res)=> console.log(res)).catch((err)=> console.log(err))

}
  return (
    <div className=" p-4">
      <div className="rounded-lg w-full   p-3 bg-white bg-opacity-100 ">
        <div className="flex justify-center text-2xl font-bold text-blue-gray-600">
          Personal Details
        </div>
        <div className="md:flex w-full flex-wrap  px-2 ">
          <div className="w-full px-2 my-6 md:w-1/2">
            <Input
              variant="static"
              label="Name"
              value={data.name}
              type="text"
              className="w-full"
              onChange={(e: any) =>
                setData({
                  name: e.target.value,
                   slug: e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
                  .replace(/\s+/g, "-") // collapse whitespace and replace by -
                  .replace(/-+/g, "-") // collapse dashes
                  .replace(/^-+/, "") // trim - from start of text
                  .replace(/-+$/, ""),
                  gender:data.gender,
                  email:data.email,
                  password:data.password,
                  education:data.education,
                  phone_no:data.phone_no,
                  address:data.address,

                })
              }
            />
          </div>
          <div className="w-full px-2 my-6 md:w-1/2">
            <Select variant="static" label="Select Gender" className="w-full" value={data.gender}  onChange={(e: any) =>
                setData({
                  name: data.name,
                   slug: data.slug,
                  gender:e,
                  email:data.email,
                  password:data.password,
                  education:data.education,
                  phone_no:data.phone_no,
                  address:data.address,

                })
              }>
              <Option  value="Male" >Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </div>
          <div className="w-full px-2 my-6 md:w-1/2">
            <Input
              variant="static"
              label="Education"
              type="text"
              className="w-full"
              value={data.education}  onChange={(e: any) =>
                setData({
                  name: data.name,
                   slug: data.slug,
                  gender:data.gender,
                  email:data.email,
                  password:data.password,
                  education:e.target.value,
                  phone_no:data.phone_no,
                  address:data.address,

                })
              }
            />
          </div>
          <div className="w-full px-2 my-6 md:w-1/2">
            <Input
              variant="static"
              label="Phone-no"
              type="text"
              className="w-full"
           value={data.phone_no}  onChange={(e: any) =>
                setData({
                  name: data.name,
                   slug: data.slug,
                  gender:data.gender,
                  email:data.email,
                  password:data.password,
                  education:data.education,
                  phone_no:e.target.value,
                  address:data.address,

                })
              } />
          </div>
          <div className="w-full mx-2 my-6 md:w-full">
            <Input
              variant="static"
              label="Address"
              type="address"
              className="w-full"
           value={data.address}  onChange={(e: any) =>
                setData({
                  name: data.name,
                   slug: data.slug,
                  gender:data.gender,
                  email:data.email,
                  password:data.password,
                  education:data.education,
                  phone_no:data.phone_no,
                  address:e.target.value,

                })
              } />
          </div>
        </div>
        <div className="flex px-2 w-full justify-end">
          <div className=" flex gap-10">
            <Button color="red">cancel</Button>
            <Button color="green" onClick={()=>handleSubmit(data)}>Save </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
