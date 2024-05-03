"use client";

import React from "react";
import { useRouter } from 'next/navigation';

import { Divider, Grid, Typography, ListItemAvatar, Avatar } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


import Button from '@/components/Button'

const ViewCart = () => {
    const router = useRouter();

    return (
        <Grid
            container
            item
            xs={12}
            marginX={4}
        >
            <Grid container item xs={9}>
                <Grid item>
                    <Typography variant="h4" component="h5" sx={{ fontWeight: "bold" }}>
                        Cart
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <List>
                        <ListItem >
                            <Grid container justifyContent="space-between">
                                <Grid item xs={6}>
                                    <ListItemText sx={{ textTransform: "uppercase", letterSpacing: 1, "& span": { fontWeight: "bold" } }} primary="Products" />
                                </Grid>

                                <Grid item xs={2}>
                                    <ListItemText sx={{ textTransform: "uppercase", letterSpacing: 1, "& span": { fontWeight: "bold" } }} primary="Quantity" />
                                </Grid>

                                <Grid item xs={2}>
                                    <ListItemText sx={{ textTransform: "uppercase", letterSpacing: 1, "& span": { fontWeight: "bold" } }} primary="Total" />
                                </Grid>

                                <Grid item xs={2}>
                                    <ListItemText sx={{ textTransform: "uppercase", letterSpacing: 1, "& span": { fontWeight: "bold" } }} primary="Actions" />
                                </Grid>
                            </Grid>
                        </ListItem>

                        <ListItem>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid container item xs={6} alignItems="center" >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt="Image"
                                            src="/path/to/image.jpg"
                                            sx={{ width: 80, height: 90, borderRadius: 0 }} // Adjust width and height as needed
                                        />
                                    </ListItemAvatar>
                                    <ListItemText sx={{ ml: 2 }} primary="Item Name" />
                                </Grid>
                                <Grid item xs={2}>
                                    <ListItemText primary="5" />
                                </Grid>

                                <Grid item xs={2}>
                                    <ListItemText primary="Rs. 5000" />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon sx={{ color: "#D11A2A" }} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>

            <Grid container item xs={3}
                sx={{
                    padding: 2,
                    height: "250px",
                    fontSize: "medium",
                    bgcolor: "white"
                }}
            >
                <Grid item xs={12}>
                    <Typography variant="h5" component="h5" sx={{ fontWeight: "medium" }}>
                        Order Summary
                    </Typography>
                </Grid>
                <Divider style={{ width: '100%' }} />
                <Grid container item xs={12} justifyContent="space-between">
                    <Typography variant="h6" component="h5" sx={{ letterSpacing: 1, fontSize: "14px" }}>
                        Delivery Charge
                    </Typography>
                    <Typography variant="h6" component="h5">
                        Rs. 100
                    </Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="space-between">
                    <Typography variant="h6" component="h5" sx={{ letterSpacing: 1, fontSize: "14px" }}>
                        Subtotal
                    </Typography>
                    <Typography variant="h6" component="h5">
                        Rs. 100
                    </Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="space-between">
                    <Typography variant="h6" component="h5" sx={{ letterSpacing: 1, fontSize: "14px" }}>
                        Total
                    </Typography>
                    <Typography variant="h6" component="h5">
                        Rs. 100
                    </Typography>
                </Grid>
                <Grid container item gap={2} marginTop={2}>
                    <Button
                        label="Proceed to checkout"
                        fullWidth
                        variant="contained"
                    />
                    <Button
                        label="Continue Shopping"
                        fullWidth
                        variant="contained"
                        onClick={() => router.push('/')} />
                </Grid>




            </Grid>
        </Grid >
    )
}

export default ViewCart;