import styled from 'styled-components';
import Logo from '../components/Logo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/user/login');
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

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
