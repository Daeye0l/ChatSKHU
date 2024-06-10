import styled from 'styled-components';
import Profile from '../public/images/kakaoprofileimage.png';
import Image from 'next/image';
import { theme } from '../styles/theme';

type Props = { message: string };
const MyConver = ({ message }: Props) => {
    return (
        <ConversationContainer>
            <p>{message}</p>
        </ConversationContainer>
    );
};
export default MyConver;

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
