import axios from 'axios';
import MypageLayout from '../../../components/layout/MypageLayout';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Image from 'next/image';
import hunsu from '/public/images/hunsu.png';
import bookmarkAfter from '/public/images/bookmark_after.png';

interface Bookmark {
    id: number;
    question: string;
    answer: string;
    createdDate: Date;
    chatRoomId: number;
    bookmarked: boolean;
}

const Bookmark = () => {
    const [bookmark, setBookmark] = useState<Bookmark[]>([]);
    const bookmarkLoadFunction = async () => {
        try {
            const response = await axios.get(`https://chatskhu.duckdns.org/bookmark`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });
            setBookmark(response.data);
        } catch (error) {}
    };
    const bookmarkPostFunction = async (id: number) => {
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
        bookmarkLoadFunction();
    };

    useEffect(() => {
        bookmarkLoadFunction();
    }, []);

    return (
        <MypageLayout pagename="북마크">
            <BookmarkContainer>
                {!bookmark.length && <div>저장한 북마크가 존재하지 않습니다.</div>}
                {bookmark.map((item) => (
                    <BookmarkItem key={item.id}>
                        <Container>
                            <ContentContainer>
                                <Image key={item.id} src={hunsu} alt={'훈수 이미지'} width={30} height={30} />
                                <p>{item.answer}</p>
                            </ContentContainer>
                            <Image
                                src={bookmarkAfter}
                                alt={'북마크이미지'}
                                width={30}
                                height={30}
                                onClick={() => {
                                    bookmarkPostFunction(item.id);
                                }}
                            />
                        </Container>
                        <hr></hr>
                    </BookmarkItem>
                ))}
            </BookmarkContainer>
        </MypageLayout>
    );
};
export default Bookmark;

const BookmarkContainer = styled.div`
    height: 100%;
    margin-top: 3rem;
`;

const BookmarkItem = styled.div`
    margin-bottom: 1rem;
    img {
        cursor: pointer;
    }
`;

const Container = styled.div`
    display: flex;
    padding-bottom: 0.5rem;
    font-size: 0.8rem;
    img:last-child {
        align-self: end;
        width: 1.5rem;
        height: fit-content;
    }

    & img:first-child {
        color: transparent;
        border: 1px solid lightgray;
        border-radius: 1rem;
        padding: 0.1rem;
        margin-right: 0.5rem;
        width: 2rem;
        height: auto;
        margin-bottom: 0.5rem;
    }
`;

const ContentContainer = styled.div`
    img {
        cursor: pointer;
    }
`;
