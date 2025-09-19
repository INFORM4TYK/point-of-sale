import DashboardStatItem from "./DashboardStatItem";

const DashboardStats = () => {
  return (
    <div className="flex items-center flex-wrap gap-4">
      <DashboardStatItem />
      <DashboardStatItem />

      <DashboardStatItem />
    </div>
  );
};

export default DashboardStats;
