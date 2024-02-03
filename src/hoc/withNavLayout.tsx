import React, { ReactComponentElement, ReactElement, ReactNode } from 'react';
import Header from '@/components/Header/Header';

interface WithHeaderProps {
    children: ReactNode;
}

const withNavLayout = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
): React.FC<P & WithHeaderProps> => {
    // eslint-disable-next-line react/display-name
    return (props: P & WithHeaderProps): ReactElement => (
        <>
            <Header />
            <WrappedComponent {...props} />
        </>
    );
};

export default withNavLayout;
