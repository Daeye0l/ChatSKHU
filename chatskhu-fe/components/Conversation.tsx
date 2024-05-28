import styled from 'styled-components';
import MyConver from './ MyConver';

const Conversation = () => {
    return (
        <ConversationContainer>
            <MyConver />
        </ConversationContainer>
    );
};
export default Conversation;

const ConversationContainer = styled.div`
    padding: 1em 0;
`;
