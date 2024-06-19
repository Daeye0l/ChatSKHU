import styled from 'styled-components';
import { theme } from '../styles/theme';
import arrow from '/public/images/arrow.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import axios from 'axios';
import router from 'next/router';

interface Prop {
    variants: {
        hidden: {
            y: number;
            opacity: number;
        };
        visible: {
            y: number;
            opacity: number;
        };
    };
    title: string;
    subtitle: string;
    onSetTrigger: () => void;
}

const handleSubmit = async (text: string) => {
    const currentUrl = window.location.href;

    let roomId = -1;
    if (!currentUrl.endsWith('/main')) {
        const index = currentUrl.lastIndexOf('/');
        roomId = Number(currentUrl.slice(index + 1, currentUrl.length));
    }

    try {
        const response = await axios.post(
            `https://chatskhu.duckdns.org/chat/${roomId}`,
            { question: text },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        router.push({
            pathname: `/c/${response.data.chatRoomId}`,
        });
    } catch (error) {
        console.log(error);
    }
};

const FAQ = ({ ...props }: Prop) => {
    const onClickHandler = async (text: string) => {
        await handleSubmit(`${text}에 대해서 알려줘`);
    };

    return (
        <FAQContainer
            {...props}
            onClick={() => {
                onClickHandler(props.title);
                props.onSetTrigger();
            }}
        >
            <div>
                <div>{props.title}</div>
                <div>{props.subtitle}</div>
            </div>
            <Image src={arrow} alt="FAQ" width={30} height={30} />
        </FAQContainer>
    );
};
export default FAQ;

const FAQContainer = styled(motion.li)`
    padding: 1.3em;
    width: 100%;
    border: 1px solid ${theme.color.grayColor};
    border-radius: ${theme.InputRadius.radius};
    margin-bottom: 0.3em;
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
        background-color: #f8f8f8;
    }

    img {
        display: none;
    }
    &:hover img {
        display: block;
    }

    div div:first-child {
        font-weight: 900;
        font-size: 20px;
        margin-bottom: 0.2em;
    }
    div div:last-child {
        font-size: 11px;
    }
`;
