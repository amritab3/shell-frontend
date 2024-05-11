import Products from "@/app/(root)/products/thrift/_components";
import URLS from "@/utils/urls";

const ThriftProducts = () => {
  return (
    <Products productsUrl={URLS.THRIFT_PRODUCTS_URL} pageTitle={"Thrift"} />
  );
};

export default ThriftProducts;
