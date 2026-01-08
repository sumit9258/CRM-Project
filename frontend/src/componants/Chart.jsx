import { useEffect, useState } from "react";
// import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Revenue from "./Revenue";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Histogram = () => {
  const [months, setMonths] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {

       const fetchDeal=async()=>{
    try {
      let res=await fetch("http://localhost:3000/api/tasks/filter-revenue")
      res=await res.json()
console.log(res);
    setMonths(res.map(item => item.month));
    setValues(res.map(item => item.revenue));
    } catch (error) {
      console.log(error);
          
    }
  }
    fetchDeal()
  }, []);

 const chartData = {
  labels: months,
  datasets: [
    {
      label: "Revenue",
      data: values,
      backgroundColor: "#3b82f6", 
      borderColor: "#2563eb",
      borderWidth: 1,
    },
  ],
};


const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "#ffffff", // legend text white
      },
    },
    tooltip: {
      titleColor: "#ffffff",
      bodyColor: "#ffffff",
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#ffffff", // month labels white
      },
      grid: {
        color: "rgba(255,255,255,0.1)", // grid light
      },
      title: {
        display: true,
        text: "Months",
        color: "#ffffff",
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#ffffff",
      },
      grid: {
        color: "rgba(255,255,255,0.1)",
      },
      title: {
        display: true,
        text: "Revenue",
        color: "#ffffff",
      },
    },
  },
};


  return (
    <div
  style={{
    width: "auto",
    margin: "auto",
    marginTop:"40px",
    background: "#111827", // dark gray
    padding: "20px",
    borderRadius: "10px",
  }}
>

      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Histogram;
