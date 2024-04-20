'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';

import NotFound from '@/components/404';
import { Box, Grid, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';


const ProductDetail = () => {
    const params = useParams();
    const [value, setValue] = React.useState<number | null>(0);

    useEffect(() => {
        //fetch product data here
        console.log(params.id)
    }, [])

    return (
        <Grid container item xs={12} sx={{ m: 4, mt: 5 }}>
            <Grid item xs={4}>
                <Box
                    component="img"
                    sx={{
                        height: 550,
                        width: 400,
                        marginLeft: 10,

                        // maxHeight: { xs: 233, md: 167 },
                        // maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="The house from the offer."
                    src="https://mode23nepal.com/image/catalog/Product/Spring%20godawari%202024/DSC05817%20(2).jpg"
                />
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6" component="h2">
                    Breadcrumbs
                </Typography>
                <Rating
                    name="product-rating"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                <Box sx={{ width: '100%', maxWidth: 500, mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        EYANA VINTAGE FLORAL SHIRT
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Rs. 2650
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Style
                    </Typography>
                    <Typography>
                        : Vintage, Adorable
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Color: Creamy
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Pattern: Floral, All Over print
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Neckline: Peter Pan Collar
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Details: Button-Front
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Sleeve Type: Puff Sleeve
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Fabric: Non-Stretch
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Material: Cotton Linen
                    </Typography>
                </Box>


            </Grid>

        </Grid>

    )

};

export default ProductDetail;
