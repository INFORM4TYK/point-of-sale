import { useParams } from "react-router-dom";
import ProductDetails from "../../components/Products/ProductDetails";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  return <ProductDetails id={id!} />;
};

export default ProductPage;
