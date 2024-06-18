import styled from 'styled-components';
import Image from 'next/image';
import hunsu from '/public/images/hunsu.png';
import bookmarkBefore from '/public/images/bookmark_before.png';
import bookmarkAfter from '/public/images/bookmark_after.png';
import axios from 'axios';

interface Chat {
    id: number;
    question: string;
    answer: string;
    createdDate: Date;
    chatRoomId: number;
    bookmarked: boolean;
}

interface ChatProp {
    item: Chat;
}
const AiResponse = ({ item }: ChatProp) => {
    const onClickHandler = async (id: number) => {
        const response = await axios.post(
            `https://chatskhu.duckdns.org/bookmark/${id}`,
            { chatId: id },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response);
    };
    return (
        <ConversationContainer>
            <Image src={hunsu} alt={'훈수 이미지'} width={30} height={30} />
            <div>
                <p>{item.answer}</p>
                <BookmarkImage
                    src={!item.bookmarked ? bookmarkBefore : bookmarkAfter}
                    alt={'북마크 이미지'}
                    width={20}
                    height={20}
                    onClick={() => onClickHandler(item.id)}
                />
            </div>
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
        margin-bottom: 0.2rem;
    }
    & img:first-child {
        color: transparent;
        border: 1px solid lightgray;
        border-radius: 1rem;
        padding: 0.1rem;
        margin-right: 0.5rem;
    }

    &:hover img {
        opacity: 1;
        cursor: pointer;
    }
`;

const BookmarkImage = styled(Image)`
    opacity: 0;
`;
