import React from "react";

import Table from "@/components/Table";
import URLS from "@/utils/urls";

interface OrderTableHeadCell {
    id: string;
    label: string;
    numeric: boolean;
    disablePadding: boolean;
}

const orderTableHeadCells: OrderTableHeadCell[] = [
    {
        id: "first_name",
        disablePadding: true,
        label: "First Name",
        numeric: false,
    },
    {
        id: "last_name",
        disablePadding: true,
        label: "Last Name",
        numeric: false,
    },
    {
        id: "email",
        disablePadding: true,
        label: "Email",
        numeric: false,
    },
];

const OrdersTable = () => {
    return (
        <Table
            headCells={orderTableHeadCells}
            defaultSortBy="first_name"
            tableTitle="Users"
            listUrl={URLS.LIST_USERS}
        />
    );
};

export default OrdersTable;
