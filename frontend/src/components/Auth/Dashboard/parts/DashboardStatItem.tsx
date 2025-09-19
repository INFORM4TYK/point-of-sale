import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
const DashboardStatItem = () => {
  return (
    <div className="border-2 flex flex-col px-6 py-4 rounded-xl gap-2">
      <div className="flex items-center gap-2">
        <PeopleAltIcon className="text-gray-400" />
        <p className="text-gray-600 font-semibold">Total Customers</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-2xl text-textDark font-bold">145</p>
      </div>
    </div>
  );
};

export default DashboardStatItem;
