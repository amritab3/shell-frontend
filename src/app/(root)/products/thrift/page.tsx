import Products from "@/app/(root)/products/thrift/_components";
import URLS from "@/utils/urls";

const ThriftProducts = () => {
  return (
    <Products productsUrl={URLS.LIST_WOMEN_PRODUCTS} pageTitle={"Thrift"} />
  );
};

export default ThriftProducts;
