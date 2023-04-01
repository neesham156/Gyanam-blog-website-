/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import { Jsonify } from "database/database";
import moment from "moment";
import router from "next/router";
import { AiFillLike } from "react-icons/ai";
import { SlLike } from "react-icons/Sl";
import { FaComments, FaRegComments } from "react-icons/Fa";

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Content({ data, cat }: any) {
  const [posts, setPosts] = useState<any>(data);
  const [hasMore, setHasMore] = useState(true);

  const [like, setLike] = useState(false);
  const getMorePost = async () => {
    await axios
      .get(`/api/infinite?_start=${posts.length}&_limit=3`)
      .then((res) => {
        res?.data?.record.length > 0
          ? setPosts((post: any) => [...post, ...res.data.record])
          : setHasMore(false);
      })

      .catch((err) => console.log(err));
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={
         <div>Loading...</div>
        }
        // endMessage={
        // //   <h4 className="flex justify-center text-4xl">Nothing more to show</h4>
        // }
      >
        <div className="w-full md:p-6 flex flex-wrap gap-8 justify-center ">
          <div className="flex justify-between p-3 border-b w-[85%] border-gray-400  ">
            <div className="text-black font-serif font-bold  text-lg md:text-3xl ">
              <p>ALL STORIES</p>
            </div>
            {/* <div className=" ">
                <Select
                  variant="outlined"
                  label={data.category}
                  value={data.category}
                  onChange={(e) =>
                    setData({
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
              </div> */}
          </div>
          {posts?.map((item: any) => (
            <>
              <div
                className="flex justify-center cursor-pointer
              "
                onClick={() => router.push(`./${item.slug}`)}
              >
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
                      Last updated {moment(item?.updatedAt).format("D MMM YY")}{" "}
                      mins ago
                    </p>

                    <div className=" flex items-center justify-start  gap-3 h-[50px] ">
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
                      <SlLike
                        onClick={(e) => setLike(true)}
                        className={like ? "text-blue-500" : "text-gary-500"}
                      />
                      50
                      <FaRegComments />
                      60
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
