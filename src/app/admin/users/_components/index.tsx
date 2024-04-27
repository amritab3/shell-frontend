import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Table from "@/components/Table";
import URLS from "@/utils/urls";
import { RootState } from "@/redux/store";
import { UserType } from "@/utils/schema";

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
  const [userData, setUserData] = useState<Array<UserType>>([]);
  const accessToken = useSelector(
    (state: RootState) => state.user.access_token,
  );

  useEffect(() => {
    fetch(URLS.LIST_USERS, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (response) => {
        const data: Array<UserType> = await response.json();
        setUserData(data);
      })
      .catch((error) => {
        console.log("Error while fetching users", error);
      });
  }, []);

  return (
    <Table
      data={userData!}
      headCells={userTableHeadCells}
      defaultSortBy="first_name"
    />
  );
};

export default UsersTable;
