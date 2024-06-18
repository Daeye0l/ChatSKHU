import axios from 'axios';
import { useRouter } from 'next/router';
import MypageLayout from '../../../../components/layout/MypageLayout';
import { styled } from 'styled-components';
import { useState } from 'react';
import ReportComment from '../../../../components/ReportComment';

const Index = () => {
    const router = useRouter();
    const { title, content, id } = router.query;

    const idNumber = typeof id === 'string' ? Number(id) : NaN;

    const onDeleteHandler = async () => {
        if (isNaN(idNumber)) {
            alert('Invalid ID');
            return;
        }
        try {
            const response = await axios.delete(`https://chatskhu.duckdns.org/report/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });
            router.back();
        } catch (e) {
            console.log(e);
        }
    };

    const onUpdateHandler = () => {
        router.push({
            pathname: 'create',
            query: { title, content, id },
        });
    };
    return (
        <MypageLayout pagename={'문의'}>
            <Container>
                <h1>{title}</h1>
                <div>{content}</div>
                <button onClick={onUpdateHandler}>수정</button>
                <button onClick={onDeleteHandler}>삭제</button>
            </Container>
            <Container>
                <ReportComment id={idNumber} />
            </Container>
        </MypageLayout>
    );
};
export default Index;

const Container = styled.div`
    width: 100%;
    margin-top: 4rem;
    flex-grow: 1;

    h1 {
        font-size: 1.5rem;
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
        margin-bottom: 1rem;
        margin-right: 1rem;
    }
    h1,
    div {
        margin-bottom: 1rem;
    }
`;
