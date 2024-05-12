import React from "react";

import Table from "@/components/Table";
import URLS from "@/utils/urls";

interface RolesTableHeadCell {
  id: string;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

const rolesTableHeadCells: RolesTableHeadCell[] = [
  {
    id: "name",
    disablePadding: true,
    label: "Role",
    numeric: false,
  },
];

const RolesTable = () => {
  const addButton = {
    redirectTo: "/admin/users/roles/add/",
    label: "Add New Role",
  };
  return (
    <Table
      headCells={rolesTableHeadCells}
      defaultSortBy=""
      tableTitle="Roles"
      listUrl={URLS.ADMIN_ROLES_URL}
      addButton={addButton}
    />
  );
};

export default RolesTable;
