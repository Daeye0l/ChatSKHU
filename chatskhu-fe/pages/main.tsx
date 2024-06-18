import Image from 'next/image';
import speechbubble from '/public/images/chat.png';
import styled from 'styled-components';
import Input from '../components/Input';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/Sidebar';
import { useStore } from '../store/store';
import FAQ from '../components/FAQ';
import { motion } from 'framer-motion';
import useChatList from '../hooks/useChatList';
import { useList } from '../store/conversationstore';
import { useEffect } from 'react';
import useProfile from '../hooks/useProfile';
import { userprofile } from '../store/profile';
import Spinner from '/public/spinner.svg';
import { useStateStore } from '../store/submitting';

const Main = () => {
    const { isOpen } = useStore();
    const { setResponseData } = useList();

    const [chatList] = useChatList();
    const [info] = useProfile();
    const { isSubmitting } = useStateStore();
    const { setResponseData: setUserResponse } = userprofile();

    const contentArray = [
        { id: 0, title: '수강신청', subtitle: '수강신청에 대해서 궁금하신가요?' },
        { id: 1, title: '마이크로전공', subtitle: '마이크로 전공에 대해서 알려드릴까요?' },
        { id: 2, title: '승연관 위치', subtitle: '자세한 건물 위치가 궁금하세요?' },
    ];

    useEffect(() => {
        if (chatList) {
            setResponseData(chatList);
        }

        if (info) {
            setUserResponse(info);
        }
    }, [chatList, setResponseData, info]);

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };
    return (
        <Layout>
            {isSubmitting ?? (
                <SpinnerContainer>
                    <Spinner />
                </SpinnerContainer>
            )}
            <EntireContainer>
                <Presentation>
                    <CenterContainer>
                        <DefaultImg>
                            <Image src={speechbubble} width={80} height={80} alt="speechbubble" />
                            <div>무엇이 궁금한가요?</div>
                        </DefaultImg>
                        <FAQsContainer initial="hidden" animate="visible" variants={container}>
                            {contentArray.map((index) => (
                                <FAQ key={index.id} variants={item} title={index.title} subtitle={index.subtitle} />
                            ))}
                        </FAQsContainer>
                    </CenterContainer>
                </Presentation>
            </EntireContainer>

            <Input />
            {isOpen && <Sidebar />}
        </Layout>
    );
};
export default Main;
const EntireContainer = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;
const Presentation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50% 0 50% 0;
`;
const DefaultImg = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 3.2em;
    flex-grow: 1;
    img {
        margin-bottom: 0.5em;
    }
    div {
        font-weight: 100;
    }
`;
const FAQsContainer = styled(motion.ul)`
    position: absolute;
    bottom: 0;
    width: 95%;
`;
const CenterContainer = styled.main`
    width: 95%;
    display: flex;
    flex-direction: column;
`;
const SpinnerContainer = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
`;
