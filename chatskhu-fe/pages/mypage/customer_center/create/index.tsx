import { styled } from 'styled-components';
import MypageLayout from '../../../../components/layout/MypageLayout';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';

interface QueryParams {
    title: string;
    content: string;
    id: string;
}
const CreateIndex = () => {
    const router = useRouter();
    const { title: queryTitle = '', content: queryContent = '', id: textId } = router.query;
    const [title, setTitle] = useState(queryTitle);
    const [content, setContent] = useState(queryContent);
    // const post: number = textId ? parseInt(textId) : 0;

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        console.log(title);
    };
    const textareaChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
        console.log(content);
    };
    const onClickHandler = async () => {
        if (!title.length && !content.length) {
            alert('제목과 내용을 적어주세요.');
            return;
        }
        if (textId) {
            try {
                const response = await axios.put(
                    `https://chatskhu.duckdns.org/report/${textId}`,
                    { title, content },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                router.push({
                    pathname: `/mypage/customer_center/${textId}`,
                    query: { title: title, content: content },
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axios.post(
                    'https://chatskhu.duckdns.org/report',
                    {
                        title,
                        content,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log(response);
            } catch (error) {
                console.log('error: ', error);
            }
            router.push('/mypage/customer_center/');
        }
    };
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return (
        <MypageLayout pagename={'문의'}>
            <Container>
                <form onSubmit={onSubmitHandler}>
                    <input type="text" placeholder="제목" onChange={inputChangeHandler} value={title} />
                    <textarea placeholder="내용을 입력해주세요" onChange={textareaChangeHandler} value={content} />
                    <button onClick={onClickHandler}>작성</button>
                </form>
            </Container>
        </MypageLayout>
    );
};
export default CreateIndex;
const Container = styled.div`
    width: 80%;
    height: 100%;
    margin-top: 4rem;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        width: 100%;
        border: none;
        border-bottom: 1px solid gray;
        font-size: 1rem;
        padding: 0.5rem;
    }
    input:focus {
        outline: none;
    }
    textarea {
        width: 100%;
        height: 30rem;
        resize: none;
        margin: 2rem 0;
        border: none;
        border: 1px solid gray;
        padding: 0.5rem;
    }
    textarea:focus {
        outline: none;
    }
    button {
        align-self: end;
        background: black;
        color: white;
        padding: 0.5rem 1.5rem;
        border: none;
        border-radius: 0.8rem;
        font-weight: 900;
        cursor: pointer;
    }
`;
