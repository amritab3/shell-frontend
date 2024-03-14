import React, { ReactElement, ReactNode } from 'react';
import Grid from '@mui/material/Grid';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface WithLayoutProps {
    children: ReactNode;
}

const withNavLayout = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
): React.FC<P & WithLayoutProps> => {
    // eslint-disable-next-line react/display-name
    return (props: P & WithLayoutProps): ReactElement => (
        <>
            <Grid
                container
                sx={{
                    height: '100vh',
                }}
                flexDirection="column"
                justifyContent="space-between"
            >
                <Grid item>
                    <Header />
                </Grid>
                <Grid item>
                    <WrappedComponent {...props} />
                </Grid>
                <Grid item>
                    <Footer />
                </Grid>
            </Grid>
        </>
    );
};

export default withNavLayout;
