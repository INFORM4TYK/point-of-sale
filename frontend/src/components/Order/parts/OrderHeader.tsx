import Decimal from "decimal.js";

const OrderHeader = ({ id, total }: { id: number; total: string }) => {
  const normalizedTotalPrice = new Decimal(total).div(100).toFixed(2);
  return (
    <div className="flex justify-between flex-col sm:flex-row sm:items-center items-start gap-2 pb-4">
      <h2 className="sm:text-2xl font-bold ">
        Szczegóły zamówienia <span className="text-primary"> #{id} </span>
      </h2>
      <p className="sm:text-2xl ">
        Total:
        <span className="text-primary font-bold"> {normalizedTotalPrice} </span>
        PLN
      </p>
    </div>
  );
};

export default OrderHeader;
