import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

const Chart = () => {
  const [months, setMonths] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        let res = await fetch("http://localhost:3000/api/tasks/filter-revenue");
        res = await res.json();
        setMonths(res.map((item) => item.month));
        setValues(res.map((item) => item.revenue));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeal();
  }, []);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Revenue",
        data: values,
        // Gradient styling
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "#AEA4BF"); // accent-soft
          gradient.addColorStop(1, "#8F6593"); // accent-main
          return gradient;
        },
        hoverBackgroundColor: "#3B252C",
        borderRadius: 12,
        borderSkipped: false,
        barThickness: 32,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Cleaner look without legend
      },
      tooltip: {
        backgroundColor: "#3B252C",
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          label: (context) => ` ₹${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(59, 37, 44, 0.5)",
          font: { size: 12, weight: '600' },
        },
        grid: {
          display: false, // Hide vertical grids for a cleaner look
        },
        border: {
            display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "rgba(59, 37, 44, 0.5)",
          font: { size: 11, weight: '600' },
          callback: (value) => "₹" + value.toLocaleString(),
        },
        grid: {
          color: "rgba(0,0,0,0.04)",
          drawTicks: false,
        },
        border: {
            display: false,
            dash: [5, 5] // Dashed y-axis line
        }
      },
    },
  };

  return (
    <div className="h-[350px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Chart;