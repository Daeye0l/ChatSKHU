import { styled } from 'styled-components';
import Input from '../../components/Input';
import Layout from '../../components/layout/Layout';
import Conversation from '../../components/Conversation';
import useConversationList from '../../hooks/useConversationList';
import { useStore } from '../../store/store';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { theme } from '../../styles/theme';
import hunsu from '/public/images/hunsu.png';
import Image from 'next/image';
import Spinner from '../../public/spinner.svg';

export type Conversataion = {
    answer: string;
    chatRoomId: number;
};

const Chat = () => {
    const [client, setClient] = useState<string>('');
    const [conversation, setConversation] = useState<string[]>([]);
    const [response, setResponse] = useState<Conversataion>();
    const [isLoading, setIsLoading] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState<number>(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useStore();

    const onClient = (value: string) => {
        setClient(value);
    };

    const onConversation = () => {
        setConversation([client]);
    };

    const onSetLoading = (bool: boolean) => {
        setIsLoading(bool);
    };

    var chatRoom = 0;
    if (typeof window !== 'undefined') {
        const currentUrl = window.location.href;
        const index = currentUrl.lastIndexOf('/');
        chatRoom = Number(currentUrl.slice(index + 1, currentUrl.length));
    }

    const [list] = useConversationList(chatRoom, updateTrigger); // updateTrigger 추가

    const onpostHandler = async (me: string) => {
        setIsLoading(true); // 로딩 시작
        try {
            const response = await axios.post(
                `https://chatskhu.duckdns.org/chat/${chatRoom}`,
                { question: me },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setResponse(response.data);
            setIsLoading(false); // 로딩 종료
            setUpdateTrigger((prev) => prev + 1); // 트리거 업데이트
        } catch (error) {
            console.log(error);
            setIsLoading(false); // 오류 발생 시 로딩 종료
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [isLoading]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };
    return (
        <Layout>
            <EntireContainer>
                <Conversation list={list} />
                {isLoading && (
                    <ConversationContainer>
                        <p>{conversation}</p>
                    </ConversationContainer>
                )}
                {isLoading && (
                    <ResponseContainer>
                        <HunsuImage>
                            <Image src={hunsu} width={30} height={30} alt="캐릭터 로고 이미지" />
                        </HunsuImage>
                        {isLoading && (
                            <div>
                                <Spinner />
                            </div>
                        )}
                        {!isLoading && <div>{response?.answer}</div>}
                    </ResponseContainer>
                )}
            </EntireContainer>
            <Input
                onpostHandler={onpostHandler}
                onClient={onClient}
                onConversation={onConversation}
                onSetLoading={onSetLoading}
            />
            <div></div>
            {isOpen && <Sidebar />}
        </Layout>
    );
};

export default Chat;

const EntireContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const HunsuImage = styled.div`
    width: 2.2rem;
    color: transparent;
    border: 1px solid lightgray;
    border-radius: 1rem;
    padding: 0.1rem;
    margin-right: 0.5rem;
    height: fit-content;
`;

const ConversationContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2em;
    p {
        width: fit-content;
        padding: 1em;
        border-radius: 1em;
        background-color: ${theme.color.grayColor};
    }
`;

const ResponseContainer = styled.div`
    display: flex;
    svg {
        width: 30px;
        height: auto;
    }
`;
