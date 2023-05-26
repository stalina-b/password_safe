import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from 'react';
import axios from 'axios';

const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
const pieData = {
    labels: [
      'Paid',
      'Free',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [1, 2],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 4
    }]
  };
export const Adminboard = () => {
    return(
        <div className="grid w-screen h-screen grid-flow-col grid-cols-3 grid-rows-6 gap-2 p-2">
            <div className="bg-orange-200 rounded-lg col-span-3 row-span-3 flex ">
                <div className="flex-row">
                    <h1 className="text-2xl m-3">Welkol, Amdin</h1>
                    <h2 className="text-xl m-2 ms-3">Users and passwords</h2>
                </div>
                <div className="bg-lime-200 w-5/6 m-4"><Line data={lineData} /></div>
            </div>
            <div className="bg-amber-200 rounded-lg row-span-3">
                <Pie data={pieData} />
            </div>
            <div className="bg-lime-200 rounded-lg row-span-3 col-span-2">
                ccc
            </div>
        </div>
    )
}