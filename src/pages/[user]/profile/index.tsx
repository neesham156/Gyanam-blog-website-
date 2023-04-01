import React, { useEffect } from "react";
import Image from "next/image";
import { type } from "os";
import{Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,Filler,} from "chart.js"
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,Filler,
);


export default function index() {


  // eslint-disable-next-line react-hooks/rules-of-hooks
 const data={
  backgroundColor:["rgb(2,88,255)","rgb(249,151,0)","rgb(2,88,255)","rgb(249,151,0)",],
  labels:['php',"c++","java","html"],
  datasets:[{
    backgroundColor:["rgb(2,88,255)","rgb(249,151,0)","rgb(2,88,255)","rgb(249,151,0)",],
    data:[5,10,7,15],
    hoverOffset:4,
  },],
 };

  return (
    <div className="my-2 mx-2">
      <div className="rounded-lg w-full bg-white bg-opacity-100 h-96">
        <div className="rounded-full  w-32  p-5   ">
          <Image
            src="/rr+.jpg"
            className="rounded-full  "
            alt="Avatar"
            width={500}
            height={500}
          />
        </div>
        <div className="shadow-lg rounded-lg overflow-hidden">
          <div className="py-3 px-5 bg-gray-50">Pie chart</div>
      <div className="w-1/3 "> <Line data={data} width={10} height={10} /></div>
         
        </div>
      </div>`
    </div>
  );
}
