import React from "react";
import ReactApexChart from "react-apexcharts";

// Funkcja do generowania losowych danych sprzedaży
const generateRandomSales = (days: number) => {
  const sales = [];
  const labels = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(
      date.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" })
    );
    sales.push(Math.floor(Math.random() * 500 + 50)); // losowa kwota 50-550
  }
  return { labels, sales };
};

const DashboardSalesChart: React.FC = () => {
  const { labels, sales } = generateRandomSales(30);

  const options: any = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: labels,
      labels: { rotate: -45 },
    },
    yaxis: {
      title: {
        text: "Sprzedaż (PLN)",
      },
    },
    dataLabels: { enabled: false },
    colors: ["#008FFB"],
    tooltip: {
      y: {
        formatter: (val: number) => `${val} PLN`,
      },
    },
  };

  const series = [
    {
      name: "Sprzedaż",
      data: sales,
    },
  ];

  return (
    <div className="border-2 px-6 py-4 rounded-xl w-full overflow-x-auto">
      <h2 className="text-xl text-gray-600 font-semibold mb-4">
        Sprzedaż dzienna (ostatnie 30 dni)
      </h2>
      <div className="min-w-[800px]">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={400}
        />
      </div>
    </div>
  );
};

export default DashboardSalesChart;
