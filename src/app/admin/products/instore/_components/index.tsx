import React from "react";

import Table from "@/components/Table";
import URLS from "@/utils/urls";

interface InstoreProductTableHeadCell {
  id: string;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

const instoreProductsTableHeadCells: InstoreProductTableHeadCell[] = [
  {
    id: "name",
    disablePadding: true,
    label: "Product Name",
    numeric: false,
  },
  {
    id: "price",
    disablePadding: true,
    label: "Product Price",
    numeric: false,
  },
  {
    id: "category",
    disablePadding: true,
    label: "Category",
    numeric: false,
  },
  {
    id: "gender",
    disablePadding: true,
    label: "Gender",
    numeric: false,
  },
];

const InstoreProductsTable = () => {
  const addButton = {
    redirectTo: "/products/add",
    label: "Add New Product",
  };
  return (
    <Table
      headCells={instoreProductsTableHeadCells}
      defaultSortBy="name"
      tableTitle="Instore Products"
      listUrl={URLS.LIST_PRODUCTS}
      addButton={addButton}
    />
  );
};

export default InstoreProductsTable;
