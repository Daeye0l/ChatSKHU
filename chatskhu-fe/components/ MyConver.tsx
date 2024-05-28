import styled from 'styled-components';
import Profile from '../public/images/kakaoprofileimage.png';
import Image from 'next/image';
import { theme } from '../styles/theme';

const MyConver = () => {
    return (
        <ConversationContainer>
            <p>수강신청 하는 방법 알려줘</p>
        </ConversationContainer>
    );
};
export default MyConver;

const ConversationContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    p {
        width: fit-content;
        padding: 1em;
        border-radius: 1em;
        background-color: ${theme.color.grayColor};
    }
`;
