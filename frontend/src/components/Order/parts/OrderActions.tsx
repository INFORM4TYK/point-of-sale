
const OrderActions = ({ id }: { id: number }) => {
  return (
    <div className="flex gap-2 justify-between">
      <button
        onClick={() => console.log("Anuluj zamówienie", id)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Anuluj
      </button>
      <button
        onClick={() => console.log("Realizuj zamówienie", id)}
        className="px-4 py-2 bg-green-500 max-w-[400px] w-full text-white rounded hover:bg-green-600"
      >
        Realizuj
      </button>
    </div>
  );
};

export default OrderActions;
