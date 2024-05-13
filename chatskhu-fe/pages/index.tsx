import styled from 'styled-components';
import Logo from '../components/Logo';

export default function Home() {
    return (
        <MainLogoContainer>
            <Logo />
        </MainLogoContainer>
    );
}

const MainLogoContainer = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    padding-bottom: 10rem;
`;
