const ProductListNotFound = ({ query }: { query: string }) => {
  return (
    <div className=" max-h-screnn h-[500px] w-full flex justify-center items-center gap-1 text-gray-600">
      Brak produktów
      {query && <strong>: {query}</strong>}
    </div>
  );
};

export default ProductListNotFound;
