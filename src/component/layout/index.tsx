import React, { useEffect, useState } from "react";
import Footer from "../footer";
import Nav from "../Nav";
import styles from "../../styles/Cafe.module.css";
import { GiBrassEye, GiOctogonalEye, GiSemiClosedEye } from "react-icons/Gi";

export default function Globallayout({ children }: any) {
  const [loading, setLoading] = useState(false);
  const [animation, setAnimation] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setAnimation(false);
  //   }, 1000);
  //   setTimeout(() => {
  //     setAnimation(true);
  //   }, 2000);
  //   setTimeout(() => {
  //     setAnimation(false);
  //   }, 3000);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 4000);
  // }, [loading]);

  return loading ? (
    <div className=" bg-cyan-800 ">
      <div className="h-full flex justify-center items-center">
        {/* <i  className={`${animation ? "animate-bounce" : "animate-pulse duration-75"  } h-5 w-5 mx-4 mr-3 text-5xl text-red-900`}><GiOctogonalEye/></i>
        <i  className={`${animation ? "animate-bounce" : "animate-pulse duration-75"  } h-5 w-5  mx-4 mr-3 text-5xl text-red-900`}><GiBrassEye/></i>
        <i  className={`${animation ? "animate-bounce" : "animate-pulse duration-75"  } h-5 w-5 mr-3 mx-4 text-5xl text-red-900`}><GiSemiClosedEye/></i> */}

        <svg
          className={`${
            animation ? "animate-bounce" : "animate-spin duration-75"
          } h-6 w-4 mr-3 bg-red-900`}
          viewBox="0 0 24 24"
        ></svg>
        <svg
          className={`${
            animation ? "animate-bounce" : "animate-spin duration-75"
          } h-6 w-4 mr-3 bg-green-500`}
          viewBox="0 0 24 24"
        ></svg>
        <svg
          className={`${
            animation ? "animate-pulse" : "animate-spin duration-75"
          } h-6 w-4 mr-3 bg-blue-400`}
          viewBox="0 0 24 24"
        ></svg>
      </div>
    </div>
  ) : (
    <>
      <main className="bg-blue-gray-800 ">
        <div className="py-3 h-[10vh]">
          <Nav />
        </div>
        <div>{children}</div>
        <div className="h-[10vh]">
          <Footer />
        </div>
      </main>
    </>
  );
}
