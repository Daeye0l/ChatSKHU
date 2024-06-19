import styled from 'styled-components';
import Image from 'next/image';
import arrowup from '/public/images/arrowup.png';
import sendbutton from '/public/images/sendbutton.png';
import { theme } from '../styles/theme';
import { useRef, useState } from 'react';

interface Props {
    handleSubmit?: (text: string) => void;
    onpostHandler?: (text: string) => void;
    onClient?: (value: string) => void;
    onConversation?: () => void;
    onSetLoading?: (bool: boolean) => void;
    onSetTrigger?: () => void;
}

const Input = ({
    handleSubmit: onRequestRoomId,
    onpostHandler,
    onClient,
    onConversation,
    onSetLoading,
    onSetTrigger,
}: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [me, setMe] = useState<string>('');

    const onKeyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMe(e.target.value);
        if (onClient) onClient(e.target.value);
    };

    const onClickHandler = () => {
        if (me.trim() === '') {
            alert('한 자 이상 입력해주세요.');
            return;
        }
        if (onSetLoading) onSetLoading(true);
        let chatRoom = 0;
        if (typeof window !== 'undefined') {
            const currentUrl = window.location.href;
            const index = currentUrl.lastIndexOf('/');
            chatRoom = Number(currentUrl.slice(index + 1, currentUrl.length));
        }
        if (chatRoom > 0) {
            if (onpostHandler) onpostHandler(me);
        } else {
            if (onRequestRoomId) onRequestRoomId(me);
        }
        if (onConversation) onConversation();
        if (onClient) onClient('');
        if (textareaRef.current) {
            textareaRef.current.value = ''; // ref를 사용하여 textarea 값 비우기
        }
        setMe(''); // 상태도 비워줍니다.
        onSetTrigger ? onSetTrigger() : '';
    };

    // ENTER로 form 제출
    const onEnterPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter' && !e.shiftKey && me.length !== 0) {
            e.preventDefault();
            onClickHandler();
            console.log('눌려지고 있음 ');
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <Footer>
            <InputContainer onSubmit={onSubmit}>
                <textarea
                    placeholder="궁금한 점을 입력해주세요..."
                    onKeyDown={onEnterPress}
                    onChange={onKeyChange}
                    value={me}
                    ref={textareaRef}
                />
                <Image
                    src={me ? sendbutton : arrowup}
                    alt="입력전_화살표"
                    width={30}
                    height={30}
                    onClick={onClickHandler}
                />
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
