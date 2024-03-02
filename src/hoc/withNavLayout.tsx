import React, { ReactElement, ReactNode } from "react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Grid from "@mui/material/Grid";

interface WithLayoutProps {
  children: ReactNode;
}

const withNavLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithLayoutProps> => {
  // eslint-disable-next-line react/display-name
  return (props: P & WithLayoutProps): ReactElement => (
    <>
      <Grid 
        sx={{
            

        }}
      >
        <Header />
        <WrappedComponent {...props} />
        <Footer />
      </Grid>
    </>
  );
};

export default withNavLayout;
