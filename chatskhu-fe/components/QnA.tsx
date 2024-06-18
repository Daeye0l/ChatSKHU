import styled from 'styled-components';
import React, { useEffect, useMemo } from 'react';
import ListItem from './ListItem';
import axios from 'axios';
import { useList } from '../store/conversationstore';
import useChatList from '../hooks/useChatList';

interface Item {
    id: number;
    title: string;
    userId: number;
}
interface Props {
    month: string;
    chat: Item[];
}

const QnA = ({ month, chat }: Props) => {
    const { responseData, setResponseData } = useList();
    const [chatList, setChatList] = useChatList();

    useEffect(() => {
        if (chatList) {
            setResponseData(chatList);
        }
    }, [chatList, setResponseData]);

    const onDeleteHandler = async (e: React.MouseEvent<HTMLImageElement>, id: number) => {
        e.stopPropagation();
        try {
            await axios.delete(`https://chatskhu.duckdns.org/chat/chatroom/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });
            setChatList(); // 삭제 후 채팅 목록 갱신
        } catch (error) {
            console.error(error);
        }
    };

    const day = chat.length ? month : '';
    const reversedList = useMemo(() => [...chat].reverse(), [chat]);

    return (
        <QnAContainer>
            {day && <DateStyle>{month}</DateStyle>}
            {reversedList.map((item) => (
                <ListItem
                    title={item.title}
                    id={item.id}
                    key={item.id}
                    onDeleteHandler={(e) => onDeleteHandler(e, item.id)}
                />
            ))}
        </QnAContainer>
    );
};

export default React.memo(QnA);

const QnAContainer = styled.div`
    margin-top: 1.25rem;
`;

const DateStyle = styled.div`
    padding: 0.75rem 0.5rem 0.5rem 0.5rem;
    color: gray;
    font-size: 0.7rem;
    font-weight: bold;
`;
