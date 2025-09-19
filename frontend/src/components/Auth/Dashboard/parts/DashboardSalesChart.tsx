import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getAllOrders, getOrderById } from "../../../../services/orderService";
import Decimal from "decimal.js";

const DashboardSalesChart: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [sales, setSales] = useState<number[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersSummary = await getAllOrders();
        const ordersWithItems = await Promise.all(
          ordersSummary.map((o) => getOrderById(o.id))
        );

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const allDates: string[] = [];
        for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(year, month, i);
          allDates.push(
            date.toLocaleDateString("pl-PL", {
              day: "2-digit",
              month: "2-digit",
            })
          );
        }

        const salesMap: Record<string, number> = {};
        ordersWithItems.forEach((order) => {
          const date = new Date(order.created_at).toLocaleDateString("pl-PL", {
            day: "2-digit",
            month: "2-digit",
          });

          if (!salesMap[date]) salesMap[date] = 0;

          const normalizedPrice = new Decimal(order.total).div(100);
          salesMap[date] = new Decimal(salesMap[date])
            .plus(normalizedPrice)
            .toNumber();
        });
        setLabels(allDates);
        setSales(allDates.map((d) => salesMap[d] || 0));
      } catch (err) {
        console.error("Failed to fetch orders for chart", err);
      }
    };

    fetchOrders();
  }, []);

  const options: any = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        columnWidth: "50px",
        distributed: false,
      },
    },
    xaxis: { categories: labels, labels: { rotate: -45 } },
    yaxis: { title: { text: "Sprzedaż (PLN)" } },
    dataLabels: { enabled: false },
    colors: ["#008FFB"],
    tooltip: { y: { formatter: (val: number) => `${val} PLN` } },
  };
  const series = [{ name: "Sprzedaż", data: sales }];

  return (
    <div className="border-2 px-6 py-4 rounded-xl w-full overflow-x-auto">
      <h2 className="text-xl text-gray-600 font-semibold mb-4">
        Sprzedaż dzienna
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
