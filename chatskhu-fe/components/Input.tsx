import styled from 'styled-components';
import Image from 'next/image';
import arrowup from '/public/images/arrowup.png';
import sendbutton from '/public/images/sendbutton.png';
import { theme } from '../styles/theme';
import { useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Input = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const [me, setMe] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onKeyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMe(e.target.value);
        // 디버깅을 위한 콘솔 출력
    };

    // ENTER로 form 제출
    const onEnterPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && me.length !== 0) {
            e.preventDefault();
            if (!isSubmitting) {
                setIsSubmitting(true);
                const text = me;
                await handleSubmit(text);
                setIsSubmitting(false);
            }
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleSubmit = async (text: string) => {
        const currentUrl = window.location.href;

        let roomId = -1;
        if (!currentUrl.endsWith('/main')) {
            const index = currentUrl.lastIndexOf('/');
            roomId = Number(currentUrl.slice(index + 1, currentUrl.length));
        }

        try {
            const response = await axios.post(
                `https://chatskhu.duckdns.org/chat/${roomId}`,
                { question: text },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data);
            setMe('');
            router.push({
                pathname: `/c/${response.data.chatRoomId}`,
            });
        } catch (error) {
            console.log(error);
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
                    ref={textareaRef}
                />
                <Image src={me ? sendbutton : arrowup} alt="입력전_화살표" width={30} height={30} />
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
