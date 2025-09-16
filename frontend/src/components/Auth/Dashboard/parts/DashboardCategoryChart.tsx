import React from "react";
import ReactApexChart from "react-apexcharts";

const DashboardCategoryChart: React.FC = () => {
  const categories = [
    "Electronics",
    "Jewelery",
    "Men's Clothing",
    "Women's Clothing",
  ];
  const sales = [120, 75, 200, 150];
  const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560"];

  const options: any = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    labels: categories,
    colors: colors,
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
    legend: { show: false },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} sprzedanych`,
      },
    },
    responsive: [
      {
        breakpoint: 840, // poniżej 640px (mobile)
        options: {
          chart: { width: 200, height: 200 },
          plotOptions: { pie: { donut: { size: "50%" } } },
        },
      },
    ],
  };

  return (
    <div className="border-2 px-4 py-4 rounded-xl w-full lg:w-fit">
      <h2 className="text-xl text-gray-600 font-semibold mb-2">
        Wykres sprzedaży według kategorii
      </h2>
      <div className="flex  flex-row justify-center items-center gap-4">
        <ReactApexChart
          options={options}
          series={sales}
          type="donut"
          width={300} 
          height={300} 
        />
        <div className="flex flex-col gap-2">
          {categories.map((cat, i) => (
            <div key={cat} className="flex items-center gap-2 text-sm sm:text-base">
              <div
                style={{ backgroundColor: colors[i], width: 16, height: 16 }}
              />
              <span>
                {cat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCategoryChart;
