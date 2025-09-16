import type { Product } from "../../types/Product";
import ProductItemActions from "./parts/ProductItemActions";
import ProductItemDetails from "./parts/ProductItemDetails";
import ProductItemInfo from "./parts/ProductItemInfo";
import ProductItemThumbnail from "./parts/ProductItemThumbnail";
const ProductItem = ({ product }: { product: Product }) => {
  console.log("💀 ~ ProductItem ~ product:", product);

  return (
    <div
      className="p-2 flex-wrap cursor-pointer flex-col flex h-full w-full gap-2 bg-white border-2 shadow-md rounded-lg overflow-hidden 
                transform transition duration-100 hover:scale-101 hover:shadow-xl"
    >
      <ProductItemThumbnail title={product.title} image={product.image} />
      <div className="flex-1 px-2 flex flex-col">
        <ProductItemInfo
          title={product.title}
          description={product.description}
          category={product.category}
        />
        <ProductItemDetails
          price={product.price}
          rating_count={product.rating_count}
          rating_rate={product.rating_rate}
        />
        <ProductItemActions />
      </div>
    </div>
  );
};

export default ProductItem;
