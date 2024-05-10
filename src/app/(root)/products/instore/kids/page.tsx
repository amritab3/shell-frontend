import Products from "@/app/(root)/products/instore/_components";
import URLS from "@/utils/urls";

const KidsProducts = () => {
  return <Products productsUrl={URLS.LIST_KIDS_PRODUCTS} pageTitle={"Kids"} />;
};

export default KidsProducts;
