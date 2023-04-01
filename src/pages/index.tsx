/* eslint-disable @next/next/no-img-element */
import Blog from "@/models/Blog";
import dbConnect, { Jsonify } from "database/database";
import Image from "next/image";
import moment from "moment";
import Category from "@/models/Category";
import { Select, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Author from "@/models/Author";
import axios from "axios";
import { useRouter } from "next/router";
import Content from "@/component/content";
export async function getServerSideProps(context: any) {
  console.log(context);
  dbConnect();

  const blog=await Blog.find({}).limit(5);

  // const author = await Author.aggregate([

  // {
  // $match:{

  // }
  // }
  // ]);
  const a = await Category.find({});

  return {
    props: {
      data: Jsonify(blog),
      cat: Jsonify(a),
    },
  };
}

export default function index({ data, cat }: any) {
  console.log(data);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dat, setDat] = useState<any>({
    category: "ALL",
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [arr, setArr] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log(dat.category);
    axios
      .get(`/api/blog?cate=${dat.category}`)
      .then((res) => setArr(Jsonify(res.data.record)))
      .catch((err) => console.log(err));
  }, [dat]);

  let items = arr.length;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  return (
    <div className=" min-h-screen ">
      {/* <div className=" flex justify-center flex-wrap ">
      <div className="flex flex-col md:flex-row md:max-h-52 md:max-w-2xl mx-2 my-2  rounded-lg bg-white shadow-lg">
        <img className=" w-full h-96 md:h-52 object-cover md:w-96 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg" alt="" />
        <div className="p-6 flex flex-col justify-start">
          <h5 className=" text-blue-gray-900 text-2xl font-bold mb-2">Card title</h5>
          <p className="text-gray-700 text-base mb-4">
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is
            a little bit longer.
          </p>
          <div className='flex justify-between'>
            <p className="text-gray-600 text-xs">Last updated 3 mins ago</p>
            <p className="text-gray-600 text-xs"></p>
          </div>
        </div>

      </div>
      <div className="flex flex-col md:flex-row md:max-h-52 md:max-w-2xl mx-2 my-2 rounded-lg bg-white shadow-lg">
        <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg" alt="" />
        <div className="p-6 flex flex-col justify-start">
          <h5 className=" text-blue-gray-900 text-2xl font-bold mb-2">Card title</h5>
          <p className="text-gray-700 text-base mb-4">
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is
            a little bit longer.
          </p>
          <p className="text-gray-600 text-xs">Last updated 3 mins ago</p>
        </div>

      </div>
      <div className="flex flex-col md:flex-row md:max-w-2xl  md:max-h-52 rounded-lg my-2 mx-2 bg-white shadow-lg">
        <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg" alt="" />
        <div className="p-6 flex flex-col justify-start">
          <h5 className=" text-blue-gray-900 text-2xl font-bold mb-2">Card title</h5>
          <p className="text-gray-700 text-base mb-4">
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is
            a little bit longer.
          </p>
          <p className="text-gray-600 text-xs">Last updated 3 mins ago</p>
        </div>

      </div>
      <div className="flex flex-col md:flex-row md:max-w-2xl md:max-h-52 rounded-lg mx-2 my-2 bg-white shadow-lg">
        <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg" alt="" />
        <div className="p-6 flex flex-col justify-start">
          <h5 className=" text-blue-gray-900 text-2xl font-bold mb-2">Card title</h5>
          <p className="text-gray-700 text-base mb-4">
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is
            a little bit longer.
          </p>
          <p className="text-gray-600 text-xs">Last updated 3 mins ago</p>
        </div>

      </div>
    </div> */}

      <div className="container my-10 px-6 mx-auto">
        <section className=" text-blue-800 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Latest articles
          </h2>
          <div className="flex justify-between p-4 border-b  mb-4 border-gray-400 ">
            <div className=" ">
              <Select
                variant="outlined"
                label={dat.category}
                value={dat.category}
                onChange={(e) =>
                  setDat({
                    category: e,
                  })
                }
              >
                <Option value="ALL">ALL</Option>

                {cat.map((e: any) => (
                  <>
                    <Option value={e.slug}>{e.category_name}</Option>
                  </>
                ))}
              </Select>
            </div>
            <div className="text-blue-gray-500 text-sm">
              <p>About {items} Result</p>
            </div>
          </div>

          <div className="py-2">
         <Content data={data}/>
          </div>
        </section>
      </div>
    </div>
  );
}
