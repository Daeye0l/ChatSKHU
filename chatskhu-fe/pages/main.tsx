import Image from 'next/image';
import speechbubble from '/public/images/chat.png';
import styled from 'styled-components';
import Input from '../components/Input';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/Sidebar';
import { useStore } from '../store/\bstore';
import FAQ from '../components/FAQ';

import { motion } from 'framer-motion';
import Conversation from '../components/Conversation';
import useConversationList from '../hooks/useConversationList';

const Main = () => {
    const { isOpen } = useStore();
    const [list] = useConversationList();

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
            <EntireContainer>
                <Presentation>
                    <CenterContainer>
                        <DefaultImg>
                            <Image src={speechbubble} width={80} height={80} alt="speechbubble" />
                            <div>무엇이 궁금한가요?</div>
                        </DefaultImg>
                        <FAQsContainer initial="hidden" animate="visible" variants={container}>
                            {[0, 1, 2].map((index) => (
                                <FAQ key={index} variants={item} />
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
    height: 100%;
    position: relative;
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
