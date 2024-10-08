import React from "react";

import Table from "@/components/Table";
import URLS from "@/utils/urls";

interface UserTableHeadCell {
  id: string;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

const userTableHeadCells: UserTableHeadCell[] = [
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

const UsersTable = () => {
  const addButton = {
    redirectTo: "/admin/users/add",
    label: "Add New User",
  };
  return (
    <Table
      headCells={userTableHeadCells}
      defaultSortBy="first_name"
      tableTitle="Users"
      listUrl={URLS.LIST_USERS}
      deleteUrl={URLS.DELETE_USER}
      addButton={addButton}
    />
  );
};

export default UsersTable;
