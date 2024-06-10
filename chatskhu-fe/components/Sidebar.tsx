import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Image from 'next/image';
import closebutton from '/public/images/closebutton.png';
import kakaoProfileImage from '/public/images/kakaoprofileimage.png';
import { theme } from '../styles/theme';
import { useStore } from '../store/store';
import { motion, AnimatePresence } from 'framer-motion';
import QnA from './QnA';
import { useList } from '../store/conversationstore';
import { useRouter } from 'next/router';
import { userprofile } from '../store/profile';

const Sidebar = () => {
    const { setIsOpen } = useStore();
    const { responseData } = useList();
    const { responseData: userData } = userprofile();
    const todayChats = responseData?.today || [];
    const yesterdayChats = responseData?.yesterday || [];
    const weekChats = responseData?.week || [];
    const monthChats = responseData?.month || [];
    const router = useRouter();
    const img_url = userData?.imageUrl ?? '';

    const clickHandler = () => {
        setIsOpen(false);
        router.push('/mypage/info');
    };
    return (
        <Container>
            <SideBarContainer>
                <SideBar>
                    <div>
                        <Header width="100%" border="none" padding="0.8rem 0em" src="hunsu" position="sticky" />
                        <nav>
                            <QnA month={'Today'} chat={todayChats} />
                            <QnA month={'Yesterday'} chat={yesterdayChats} />
                            <QnA month={'Week'} chat={weekChats} />
                            <QnA month={'Month'} chat={monthChats} />
                        </nav>
                    </div>
                    <SideBarFooter>
                        <div onClick={clickHandler}>
                            <Image src={img_url} width={40} height={40} alt="kakaoImageProfile" />
                            <p>{userData?.nickname}</p>
                        </div>
                    </SideBarFooter>
                </SideBar>
                <button onClick={(prev) => setIsOpen(!prev)}>
                    <Image src={closebutton} alt="hunsu_img" width={15} height={15} />
                </button>
            </SideBarContainer>
            <AnimatePresence>
                <SideBarBackground
                    key="modal"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{ opacity: 0 }}
                ></SideBarBackground>
            </AnimatePresence>
        </Container>
    );
};
export default Sidebar;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;

    button {
        height: fit-content;
        border: 0;
        cursor: pointer;

        margin-top: 3em;
        margin-left: 0.5em;

        color: white;
        background-color: transparent;
        font-size: ${theme.fontSize.extraLarge};
    }
`;
const SideBarContainer = styled(motion.div)`
    width: auto;
    position: absolute;
    height: 100vh;
    z-index: 100;
    display: flex;

    ::-webkit-scrollbar {
        width: 0.5rem;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #e8e8e8;
        border-radius: 10rem;
    }
`;
const SideBar = styled.nav`
    width: 20rem;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;

    &::-webkit-scrollbar {
        width: 0.4rem;
    }

    &::-webkit-scrollbar-thumb {
        background-color: black;
        border-radius: 10rem;
    }

    & > div {
        overflow-y: auto;
        background-color: #f8f8f8;
        padding: 0 0.8rem;
    }
`;

const SideBarBackground = styled(motion.div)`
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
`;

const SideBarFooter = styled.footer`
    & > div {
        padding: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.875rem;
        border-radius: ${theme.InputRadius.radius};
    }

    & > div:hover {
        background-color: #ececec;
        cursor: pointer;
    }
    div img {
        border-radius: 100%;
        object-fit: none;
    }
    position: sticky;
    bottom: 0;
    top: 10000px;
    padding: 0.8rem;
    background-color: #f8f8f8;
`;
