import Products from "@/app/(root)/products/instore/_components";
import URLS from "@/utils/urls";

const MenProducts = () => {
  return <Products productsUrl={URLS.LIST_MEN_PRODUCTS} pageTitle={"Men"} />;
};

export default MenProducts;
