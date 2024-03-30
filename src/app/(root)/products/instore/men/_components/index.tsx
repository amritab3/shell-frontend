'use client';

import React from 'react';
import Grid from '@mui/material/Grid';

const MenProducts = () => {
    return(
       <Grid container item justifyContent="center" gap={2} xs={12}>
        <Grid item xs={12}> Breadcrumbs </Grid>
        <Grid item xs={12}> Title </Grid>
        <Grid item xs={12}> Refine Search </Grid>
        <Grid item xs={12}> Sorting </Grid>
        <Grid item xs={12}> Products </Grid>
        <Grid item xs={12}> Pages </Grid>
        


       </Grid>
    );
};

export default MenProducts;
