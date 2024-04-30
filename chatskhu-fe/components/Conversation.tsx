import styled from 'styled-components';
import Profile from '../public/images/kakaoprofileimage.png';
import Image from 'next/image';

const Conversation = () => {
    return (
        <ConversationContainer>
            <UserInfoContainer>
                <Image src={Profile} alt={'프로필 이미지'} height={40} width={40} />
                <span>YOU</span>
            </UserInfoContainer>
            <p>수강신청 하는 방법 알려줘</p>
        </ConversationContainer>
    );
};
export default Conversation;

const ConversationContainer = styled.div`
    span {
        font-size: 1rem;
        font-weight: bold;
    }

    p {
        font-size: 0.8rem;
        font-weight: 200;
    }
`;

const UserInfoContainer = styled.div`
    margin-bottom: 0.4rem;

    img {
        border-radius: 100%;
        margin-right: 0.4rem;
        margin-bottom: 0rem;
    }
`;
