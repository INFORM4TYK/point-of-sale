import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getAllOrders, getOrderById } from "../../../../services/orderService";
import Decimal from "decimal.js";

const DashboardCategoryChart: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [sales, setSales] = useState<number[]>([]);
  const colors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#FF66C3",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersSummary = await getAllOrders();
        const ordersWithItems = await Promise.all(
          ordersSummary.map((o) => getOrderById(o.id))
        );

        const categoryMap: Record<string, number> = {};
        let totalSales = 0;

        ordersWithItems.forEach((order) => {
          order.items.forEach((item) => {
            const normalizedPrice = new Decimal(item.price)
              .div(100)
              .mul(item.amount);
            const cat = item.category || "Inne";
            const itemTotal = normalizedPrice.toNumber();
            categoryMap[cat] = (categoryMap[cat] || 0) + itemTotal;
            totalSales += itemTotal;
          });
        });

        const cats = Object.keys(categoryMap);
        const salesValues = Object.values(categoryMap);

        console.log("💰 Całkowita sprzedaż:", totalSales);
        console.log("📊 Sprzedaż po kategoriach:", categoryMap);

        setCategories(cats);
        setSales(salesValues);
      } catch (err) {
        console.error("Failed to fetch orders for category chart", err);
      }
    };

    fetchData();
  }, []);

  const options: any = {
    chart: { type: "donut", toolbar: { show: false } },
    labels: categories,
    colors,
    plotOptions: { pie: { donut: { size: "60%" } } },
    legend: { show: false },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toFixed(2)} PLN`,
      },
    },
    responsive: [
      {
        breakpoint: 840,
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
      <div className="flex flex-row justify-center items-center gap-4">
        <ReactApexChart
          options={options}
          series={sales}
          type="donut"
          width={300}
          height={300}
        />
        <div className="flex flex-col gap-2">
          {categories.map((cat, i) => (
            <div
              key={cat}
              className="flex items-center gap-2 text-sm sm:text-base"
            >
              <div
                style={{
                  backgroundColor: colors[i % colors.length],
                  width: 16,
                  height: 16,
                }}
              />
              <span>
                {cat} – {sales[i].toFixed(2)} PLN
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCategoryChart;
