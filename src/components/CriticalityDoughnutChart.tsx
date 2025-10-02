import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js elements globally (should only run once)
Chart.register(ArcElement, Tooltip, Legend);

interface CriticalityDoughnutChartProps {
  score: number; // 1-10
}

const getColor = (score: number) => {
  if (score >= 8) return "#ef4444"; // red-500
  if (score >= 5) return "#06b6d4"; // cyan-500 for moderate
  return "#06b6d4"; // cyan for normal/low in this theme
};

const getLabel = (score: number) => {
  if (score >= 8) return "Critical";
  if (score >= 5) return "Moderate";
  return "Normal";
};

const CriticalityDoughnutChart: React.FC<CriticalityDoughnutChartProps> = ({ score }) => {
  const color = getColor(score);
  const label = getLabel(score);
  const data = {
    datasets: [
      {
        data: [score, Math.max(0, 10 - score)],
        backgroundColor: [color, "#e6f6f9"], // soft cyan-ish background for remainder
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Debug: show if data is invalid
  if (score === -1) {
    return (
      <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center border-2 border-red-500 bg-red-50">
        <span className="text-red-600 font-bold">Prediction failed or model unavailable. Please try again later.</span>
      </div>
    );
  }
  if (!score || isNaN(score) || score < 0 || score > 10) {
    return (
      <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center border-2 border-red-500 bg-red-50">
        <span className="text-red-600 font-bold">Invalid score for chart: {String(score)}</span>
      </div>
    );
  }

  return (
    <div className="relative w-48 h-48 mx-auto my-4" style={{ border: '2px solid rgba(6,182,212,0.12)', background: '#f8feff', zIndex: 100 }}>
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold" style={{ color }}>{score}/10</span>
        <span className="text-lg font-semibold mt-1" style={{ color }}>{label}</span>
      </div>
    </div>
  );
};

export default CriticalityDoughnutChart;
