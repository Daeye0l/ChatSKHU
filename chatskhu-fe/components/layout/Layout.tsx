import { type ReactNode } from 'react';
import Header from '../Header';
import styled from 'styled-components';

interface Props {
    children: ReactNode;
}
const Layout = ({ children }: Props) => {
    return (
        <LayoutContainer>
            <Header position={'sticky'} />
            {children}
        </LayoutContainer>
    );
};
export default Layout;

const LayoutContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    position: relative;
`;
