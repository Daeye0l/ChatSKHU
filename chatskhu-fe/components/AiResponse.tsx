import styled from 'styled-components';
import Image from 'next/image';
import hunsu from '/public/images/hunsu.png';

type Props = { message: string };

const AiResponse = ({ message }: Props) => {
    return (
        <ConversationContainer>
            <Image src={hunsu} alt={'훈수 이미지'} width={30} height={30} />
            <p>{message}</p>
        </ConversationContainer>
    );
};
export default AiResponse;

const ConversationContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
    p {
        width: fit-content;
        border-radius: 1em;
        max-width: 20rem;
        font-size: 0.8rem;
    }
    img {
        color: transparent;
        border: 1px solid lightgray;
        border-radius: 1rem;
        padding: 0.1rem;
        margin-right: 0.5rem;
    }
`;
