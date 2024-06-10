import styled from 'styled-components';
import MyConver from './MyConver';
import AiResponse from './AiResponse';
import React, { useMemo } from 'react';
interface ChatList {
    id: number;
    question: string;
    answer: string;
    createdDate: Date;
    chatRoomId: number;
}
interface Props {
    list: ChatList[];
}
const Conversation = ({ list }: Props) => {
    const reversedList = useMemo(() => [...list].reverse(), [list]);

    return (
        <ConversationContainer>
            {reversedList.map((item, idx) => (
                <div key={item.id}>
                    <MyConver message={item.question} />
                    <AiResponse message={item.answer} />
                </div>
            ))}
        </ConversationContainer>
    );
};
export default React.memo(Conversation);

const ConversationContainer = styled.div`
    padding: 1em 0;
`;
