import styled from 'styled-components';
import Image from 'next/image';
import arrowup from '/public/images/arrowup.png';
import { theme } from '../styles/theme';
import { useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Input = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [me, setMe] = useState('');
    const [roomId, setRoomId] = useState(-1);

    const onKeyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMe(e.target.value);
    };
    //ENTER로 form 제출
    const onEnterPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 여기에 추가로 하고 싶은 작업을 넣을 수 있습니다.
    };
    const handleSubmit = async () => {
        const currentUrl = window.location.href;
        if (currentUrl.endsWith('/main')) {
            setRoomId(-1);
            const response = await axios.post(
                `https://chatskhu.duckdns.org/gpt/chat/${roomId}`,
                { question: me },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response);
            setMe('');
            setRoomId(response.data.id);
            router.push(`/c/${roomId}`, roomId.toString());
        }
    };
    return (
        <Footer>
            <InputContainer ref={formRef} onSubmit={onSubmit}>
                <textarea
                    placeholder="궁금한 점을 입력해주세요..."
                    onKeyDown={onEnterPress}
                    onChange={onKeyChange}
                    value={me}
                />
                <Image src={arrowup} alt="입력전_화살표" width={30} height={30} />
            </InputContainer>
        </Footer>
    );
};

const Footer = styled.footer`
    width: 100%;
    background-color: white;
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: center;
`;
const InputContainer = styled.form`
    width: 95%;
    padding: 0.7em;
    margin-bottom: 2em;
    display: flex;
    justify-content: space-between;

    border: 1px solid ${theme.color.grayColor};
    border-radius: ${theme.InputRadius.radius};

    background-color: white;

    textarea,
    textarea:focus {
        width: 100%;
        border: none;
        outline: none;
        resize: none;
    }
    img {
        cursor: pointer;
    }
`;

export default Input;
