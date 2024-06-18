import axios from 'axios';
import { setConfig } from 'next/config';
import { useState } from 'react';
import { styled } from 'styled-components';

interface ReportCommentProps {
    id: string;
}
interface ReportComment {
    id: number;
    title: string;
    content: string;
    answer: string;
}
const defaultReportComment: ReportComment[] = [
    {
        id: 0,
        title: '',
        content: '',
        answer: '',
    },
];

const ReportComment = ({ id }: ReportCommentProps) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<ReportComment[]>(defaultReportComment);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const onClickHandler = async () => {
        if (comments.length < 0) {
            try {
                const response = await axios.put(
                    `https://chatskhu.duckdns.org/admin/answer/${id}`,
                    { answer: comment }, // 본문에 answer를 포함한 객체 전달
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setComment('');
                setComments([response.data]); // response.data를 배열로 설정
                console.log(comments);
            } catch (e) {
                console.error(e);
            }
        } else {
            alert('댓글은 한 개 밖에 달지 못해요');
            setComment('');
        }
    };

    return (
        <FormContainer onSubmit={onSubmitHandler}>
            <input type="text" value={comment} onChange={onChangeHandler} />
            <button type="button" onClick={onClickHandler}>
                작성
            </button>
            <hr></hr>
            <CommentContainer>
                {comments.length > 0 && <span>관리자</span>}
                <p>{comments.length > 0 && comments[0].answer}</p>
            </CommentContainer>
        </FormContainer>
    );
};

export default ReportComment;

const FormContainer = styled.form`
    text-align: center;
    input {
        border: 1px solid lightgray;
        padding: 0.5rem;
        border-radius: 0.5rem;
        width: 70%;
        margin-right: 0.5rem;
    }

    input:focus {
        outline: none;
    }

    button {
        margin-right: 0;
    }
`;

const CommentContainer = styled.div`
    display: flex;
    margin-top: 1rem;
    span {
        margin-right: 1rem;
    }
`;
