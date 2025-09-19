import { useEffect, useState } from "react";
import type { Product } from "../../types/Product";
import { getProductById } from "../../services/productService";
import useLoading from "../../hooks/useLoading";
import { Add, Remove } from "@mui/icons-material";
import { Rating } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
const ProductDetails = ({ id }: { id: string }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { startLoading } = useLoading();
  const router = useNavigate();
  useEffect(() => {
    const stopLoading = startLoading();
    getProductById(id).then(setProduct).finally(stopLoading);
  }, [id]);
  const [quantity, setQuantity] = useState(1);

  const increment = () =>
    setQuantity((prev) => (prev < product?.stock! ? prev + 1 : prev));

  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const addToCart = () => {
    console.log(`Dodano do korzyka produckt o id ${id} w ilości ${quantity}`);
  };
  return (
    <div className="max-w-6xl mx-auto p-6 bg-background h-screen flex justify-center items-center">
      <div
        onClick={() => router(-1)}
        className="absolute top-4 left-4 lg:top-10 lg:left-10 bg-primary p-2 rounded-xl px-6 cursor-pointer"
      >
        <KeyboardBackspaceIcon className="text-white" fontSize="large" />
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-stretch h-fit ">
        <div className="flex-1 flex justify-center items-center  bg-gray-200 p-8 rounded-xl">
          <img
            src={product?.image}
            alt={product?.title}
            className="max-h-[500px] object-contain"
          />
        </div>

        <div className="flex-1  flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div
              className={`p-2 text-center font-semibold px-4 uppercase grid place-items-center flex-1 w-fit xl:py-4 rounded-xl cursor-pointer bg-blue-500 text-white`}
            >
              {product?.category}
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              {product?.title}
            </h1>
            <p className="text-gray-700">{product?.description}</p>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center justify-center  text-sm text-gray-600">
                <div className="space-x-2">
                  <strong className="text-xl">
                    {Number(product?.rating_rate).toFixed(1)}
                  </strong>
                  <span>({product?.rating_count})</span>
                </div>
                <Rating
                  name="read-only"
                  value={Number(product?.rating_rate)}
                  readOnly
                  size="large"
                  precision={0.25}
                />
              </div>
              <p className="text-4xl font-semibold text-primary">
                ${product?.price}
              </p>
            </div>

            <div className="flex flex-col items-end justify-between gap-2">
              <div className="flex flex-row gap-2 justify-between w-full items-end">
                <p>
                  Dostępne <strong>{product?.stock}</strong> sztuk
                </p>
                <div className="flex items-center border rounded-md overflow-hidden w-max ">
                  <button
                    disabled={quantity === 1}
                    onClick={decrement}
                    className="px-3 py-1 bg-gray-300 hover:bg-gray-400 transition h-[40px]"
                  >
                    <Remove />
                  </button>
                  <span className="px-4 text-center">{quantity}</span>
                  <button
                    disabled={quantity === product?.stock}
                    onClick={increment}
                    className="px-3 py-1 bg-gray-300 hover:bg-gray-400 transition h-[40px]"
                  >
                    <Add />
                  </button>
                </div>
              </div>
              <button
                onClick={() => addToCart()}
                type="submit"
                className="btn--gradient btn--primary h-[50px] w-full font-normal text-sm px-4"
              >
                Dodaj do koszyka
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
