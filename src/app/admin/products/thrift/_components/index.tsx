import React from "react";

import Table from "@/components/Table";
import URLS from "@/utils/urls";

interface ThriftProductTableHeadCell {
  id: string;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

const thriftProductsTableHeadCells: ThriftProductTableHeadCell[] = [
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

const ThriftProductsTable = () => {
  return (
    <Table
      headCells={thriftProductsTableHeadCells}
      defaultSortBy="name"
      tableTitle="Thrift Products"
      listUrl={URLS.LIST_PRODUCTS}
    />
  );
};

export default ThriftProductsTable;
