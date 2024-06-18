import { styled } from 'styled-components';
import backarrow from '/public/images/left-icon.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    pagename: string;
}
const MypageLayout = ({ children, pagename }: Props) => {
    const router = useRouter();
    const handleBack = () => {
        const { pathname } = router;

        if (pathname === '/mypage/customer_center') {
            router.push('/main');
        } else if (pathname.startsWith('/mypage/customer_center/')) {
            router.push('/mypage/customer_center');
        } else {
            router.back();
        }
    };
    return (
        <EntireMyPageContainer>
            <HeaderContainer>
                <BackArrow onClick={handleBack}>
                    <Image src={backarrow} width={30} height={30} alt="backarrow" />
                </BackArrow>
                <h1>{pagename}</h1>
            </HeaderContainer>
            {children}
        </EntireMyPageContainer>
    );
};
export default MypageLayout;

const EntireMyPageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    h1 {
        font-size: 1.2rem;
    }
`;
const HeaderContainer = styled.div`
    width: 100%;

    h1 {
        text-align: center;
    }
`;
const BackArrow = styled.div`
    align-self: flex-start;
    margin: 2rem 0rem;
    cursor: pointer;
    img {
        width: fit-content;
    }
`;
