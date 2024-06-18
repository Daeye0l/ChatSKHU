import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useProfile from '../hooks/useProfile';

interface ReportCommentProps {
    id: number;
}
interface CommentProps {
    answer: string;
}
interface ReportComment {
    id: number;
    title: string;
    content: string;
    answer: string;
}

const defaultValue = { answer: '' };
const ReportComment = ({ id }: ReportCommentProps) => {
    const [comment, setComment] = useState('');
    const [profile] = useProfile();
    const [getcomment, setGetcomment] = useState<CommentProps>(defaultValue); //댓글 get으로 얻어낸거
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onClickHandler();
    };

    const onClickHandler = async () => {
        try {
            const response = await axios.put(
                `https://chatskhu.duckdns.org/admin/answer/${id}`,
                { answer: comment },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response);
            setComment('');
            getCommentHandler();
        } catch (e) {
            console.error(e);
        }
    };

    const getCommentHandler = async () => {
        try {
            const response = await axios.get(`https://chatskhu.duckdns.org/report/answer/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });
            setGetcomment(response.data);
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getCommentHandler();
    }, [id]);

    return (
        <FormContainer onSubmit={onSubmitHandler}>
            {profile?.userRole !== 'ROLE_USER' && (
                <div>
                    <input type="text" value={comment} onChange={onChangeHandler} />
                    <button type="button" onClick={onClickHandler}>
                        작성
                    </button>
                    <hr></hr>
                </div>
            )}

            {getcomment.answer !== null && (
                <CommentContainer>
                    <span>답변 : </span>
                    <p>{getcomment.answer}</p>
                    <hr />
                </CommentContainer>
            )}
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
