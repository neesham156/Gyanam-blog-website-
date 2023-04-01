import React, { useState, useEffect } from "react";
import Blog from "@/models/Blog";
import dbConnect, { Jsonify } from "database/database";
import Image from "next/image";
import Author from "@/models/Author";
import moment from "moment";
import { Button } from "@material-tailwind/react";
import { RiUserFollowFill } from "react-icons/Ri";
import Category from "@/models/Category";

import { CgProfile } from "react-icons/Cg";
import { useRouter } from "next/router";
import { SlLike } from "react-icons/Sl";
import { getSession } from "next-auth/react";
import axios from "axios";
import Commet from "@/models/Commet";
export async function getServerSideProps(context: any) {
  dbConnect();
  const session = await getSession(context);

  let blogg = context.params.slug[0];
  const comm = await Commet.find({});

  const blog = await Blog.findOne({ slug: context.params.slug[0] });

  const recent_blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
  const recent_cat = await Category.find({}).skip(1).limit(7);
  const recent_auth = await Author.find({}).limit(5);

  let auth = await Author.findOne({ name: blog.author });
  return {
    props: {
      blog: Jsonify(blog),
      blogg: Jsonify(blogg),
      session: Jsonify(session),
      comm: Jsonify(comm),
      author: Jsonify(auth),
      recent_blogs: Jsonify(recent_blogs),
      recent_cat: Jsonify(recent_cat),
      recent_auth: Jsonify(recent_auth),
    },
  };
}

export default function Blogs({
  blog,
  blogg,
  session,
  author,
  comm,
  recent_blogs,
  recent_cat,
  recent_auth,
}: any) {
  const [cmt, setCmt] = useState<any>({
    author: session.email,
    comment: {
      comment: "",
    },
    blog: blogg,
  });

  useEffect(() => {
    setCmt({
      author: cmt.author,
      comment: {
        comment: cmt.comment.comment,
      },
      blog: blogg,
    });
  }, [blogg]);

  const functi = (values: any, user: any) => {
    console.log(values);
    console.log(user);
    let len = user.filter((e: any) => e.blog == values.blog).length;
    console.log(len);
    if (len) {
      console.log("put");
      axios
        .put(`/api/comment`, values)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      console.log("post");
      axios
        .post(`/api/comment`, values)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  const router = useRouter();
  return (
    <div className="flex gap-2 p-4">
      <div className="rounded-md  p-5 w-full md:8/12 bg-white bg-opacity-100 ">
        <div className="flex justify-center flex-col items-center font-black text-black text-3xl">
          <div className=" flex border-b  w-full border-gray-400  p-2">
            <div className="rounded-full  w-14 ">
              <Image
                src="/rr+.jpg"
                className="rounded-full bg-red-500 "
                alt="Avatar"
                width={500}
                height={500}
              />
            </div>
            <div className="mx-3 flex w-full  flex-col text-gray-400  text-xs ">
              <div className="flex w-full justify-between">
                <div>
                  <p className="text-black text-opacity-60 text-sm">
                    {blog.author.toUpperCase()}
                  </p>
                  <p className="text-black text-opacity-40 text-sm mt-1">
                    {author.education.toUpperCase()}
                  </p>
                </div>
                <Button
                  color="green"
                  className="w-12 h-12 rounded-full flex justify-center hover:text-orange-300 items-center text-3xl"
                >
                  <i className="">
                    <RiUserFollowFill />
                  </i>
                </Button>
              </div>
              <div className=" flex   gap-2 ">
                <p>{moment(blog.createdAt).format("DD-MM-YYYY")}</p>
                <p>{blog.category.toUpperCase()}</p>
              </div>
            </div>
          </div>
          <div className="w-full text-left flex items-center justify-between">
            <h1 className=" bg-opacity-15 my-2 ">{blog.title}</h1>
            <span className="mr-5">
              {" "}
              <SlLike />{" "}
            </span>
          </div>
          <div className="p-4 w-full ">
            <Image
              src={"/hgh5kE5.jpg"}
              width={500}
              className="w-full h-80"
              height={500}
              alt={"Image"}
            ></Image>
          </div>
        </div>
        <div className=" text-gray-600 p-2 bg-brown-50 text-lg">
          {blog.description}
        </div>

        <div className="w-full mt-10">
          <label className="block mb-2">
            <textarea
              className="block w-full mt-1 rounded border-black border"
              placeholder="Write your comment"
              rows={3}
              value={cmt.comment.comment}
              onChange={(e) =>
                setCmt({
                  author: cmt.author,
                  comment: {
                    comment: e.target.value,
                  },
                  blog: cmt.blog,
                })
              }
            />
          </label>
          <button
            className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
            onClick={() => functi(cmt, comm)}
          >
            Comment
          </button>
        </div>

        <div className="h-48 mt-10 border bg-red-500">
          <div className="w-full flex flex-col gap-2">
            <div>
            <div className="h-[50px] w-[50px] rounded-full">
              <Image
                src="/hgh5kE5.jpg"
                alt=""
                className="rounded-full h-[50px] w-[50px]"
                height={50}
                width={50}
              />
            </div>
            <div className="h-[60px] w-full bg-gray-600 rounded-md">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Officiis, a placeat id qui laboriosam exercitationem. Quaerat ad
                neque nisi voluptate dolores harum officiis tempore odio.
                Perspiciatis iste animi vitae labore.
              </p>
            </div>
            </div>

            <div>
            <div className="h-[50px] w-[50px] rounded-full">
              <Image
                src="/hgh5kE5.jpg"
                alt=""
                className="rounded-full h-[50px] w-[50px]"
                height={50}
                width={50}
              />
            </div>
            <div className="h-[60px] w-full bg-gray-600 rounded-md">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Officiis, a placeat id qui laboriosam exercitationem. Quaerat ad
                neque nisi voluptate dolores harum officiis tempore odio.
                Perspiciatis iste animi vitae labore.
              </p>
            </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>

      <div className="rounded-md  p-2 hidden md:block w-[400px] h-fit border-gray-400 border-l bg-white bg-opacity-100 ">
        <div className="border-b p-2 border-gray-400">
          <h1 className="flex justify-center text-blue-gray-700 p-2 mb-2 text-3xl border-b border-gray-400 font-bold">
            Recent Article
          </h1>
          {recent_blogs.map((item: any) => (
            <>
              <div
                className="text-sm bg-blue-50 p-1   flex justify-between  mb-4 text-gray-900 cursor-pointer"
                onClick={() => router.push(`/${item.slug}`)}
              >
                <div className="w-9/12  font-bold flex flex-col text-blue-gray-900">
                  <p>{item.title}</p>{" "}
                  <p className="mt-2 text-gray-600">{item.author}</p>
                </div>
                <div className="w-3/12">
                  <Image
                    src="/mee.jpg"
                    alt={item.title}
                    width={500}
                    height={500}
                  />{" "}
                </div>
              </div>
            </>
          ))}
        </div>

        <div className="border-b  flex flex-wrap gap-6 justify-evenly font-serif text-green-400 p-2 border-gray-400">
          <h1 className="flex justify-center text-blue-gray-700 p-2 mb-2 text-3xl border-b border-gray-400 font-bold w-full">
            {" "}
            Top Category
          </h1>
          {recent_cat.map((cat: any) => (
            <>
              <div className=" w-28 bg-black bg-opacity-80  text-center p-1 rounded-full">
                {cat.category_name}
              </div>
            </>
          ))}
        </div>
        <div className="border-b p-2 border-gray-400">
          {recent_auth.map((user: any) => (
            <>
              <div>
                <div className=" flex   w-full  p-2">
                  <div className="rounded-full  w-14 ">
                    <Image
                      src="/rr+.jpg"
                      className="rounded-full bg-red-500 "
                      alt="Avatar"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="mx-3 flex w-full  flex-col text-gray-400  text-xs ">
                    <div className="flex w-full justify-between">
                      <div>
                        <p className="text-black text-opacity-60 text-sm">
                          {user.name.toUpperCase()}
                        </p>
                        <p className="text-black text-opacity-40 text-sm mt-1">
                          {user.education.toUpperCase()}
                        </p>
                      </div>
                      <Button
                        color="green"
                        className="w-2 h-9 rounded-full flex justify-center hover:text-orange-300 items-center text-xl"
                      >
                        <i className="">
                          <RiUserFollowFill />
                        </i>
                      </Button>
                    </div>
                    {/* <div className=" flex   gap-2 ">
                <p>{moment(blog.createdAt).format("DD-MM-YYYY")}</p>
                <p>{blog.category.toUpperCase()}</p>
              </div> */}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
