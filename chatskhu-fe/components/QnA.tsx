import styled from 'styled-components';
import { useStore } from '../store/store';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

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
    const { setIsOpen } = useStore();
    const router = useRouter();
    const day = chat.length ? month : '';
    const reversedList = useMemo(() => [...chat].reverse(), [chat]);
    return (
        <QnAContainer>
            {day && <DateStyle>{month}</DateStyle>}
            {reversedList.map((item) => (
                <ConversationList
                    onClick={(prev) => {
                        setIsOpen(!prev);
                        router.push(`/c/${item.id}`);
                    }}
                    key={item.id}
                >
                    <li>{item.title}</li>
                </ConversationList>
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
const ConversationList = styled.ol`
    li {
        padding: 0.5rem;
        border-radius: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
            background-color: #ececec;
            cursor: pointer;
        }
    }
`;
