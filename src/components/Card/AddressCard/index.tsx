"use client";
import React, { useState } from "react";
import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";

import { UserAddress } from "@/utils/schema";

interface CustomAddressCardProps {
  address: UserAddress;
}

export default function AddressCard(props: CustomAddressCardProps & CardProps) {
  const { address, ...rest } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      sx={{ width: 350, borderRadius: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Grid container direction="column" sx={{ position: "relative" }}>
        <Grid item>
          <CardActionArea
            sx={{
              overflow: "hidden",
              borderRadius: 0,
              boxShadow: "none",
            }}
          ></CardActionArea>
        </Grid>
      </Grid>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {address.province}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {address.localLevel}-{address.wardNo}, {address.tole}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address.district}
        </Typography>
      </CardContent>
    </Card>
  );
}
