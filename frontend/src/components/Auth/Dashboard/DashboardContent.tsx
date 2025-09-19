import DashboardCategoryChart from "./parts/DashboardCategoryChart";
import DashboardSalesChart from "./parts/DashboardSalesChart";
import DashboardStats from "./parts/DashboardStats";

const DashboardContent = () => {
  return (
    <div className="flex flex-col gap-4 p-2 sm:p-4">
      <h2 className="text-3xl text-textDark pb-4 font-semibold">
        Panel Zarządzania
      </h2>
      <DashboardStats />
      <DashboardSalesChart />
      <div className="flex gap-4 flex-wrap">
        <DashboardCategoryChart />
      </div>
    </div>
  );
};

export default DashboardContent;
