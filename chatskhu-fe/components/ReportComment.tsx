import axios from 'axios';
import { useState } from 'react';
import { styled } from 'styled-components';

interface ReportCommentProps {
    id: string;
}
const ReportComment = ({ id }: ReportCommentProps) => {
    const [comment, setComment] = useState('');
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const onClickHandler = async () => {
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
            console.log(response);
            setComment('');
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <FormContainer onSubmit={onSubmitHandler}>
            <input type="text" onChange={onChangeHandler} />
            <button onClick={onClickHandler}>작성</button>
            <hr></hr>
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
