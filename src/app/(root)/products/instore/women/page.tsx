import Products from "@/app/(root)/products/instore/_components";
import URLS from "@/utils/urls";

const WomenProducts = () => {
  return (
    <Products productsUrl={URLS.LIST_WOMEN_PRODUCTS} pageTitle={"Women"} />
  );
};

export default WomenProducts;
