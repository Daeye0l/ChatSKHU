import styled from 'styled-components';
import Image from 'next/image';
import useLogin from '../hooks/useLogin';

const LoginButton = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    return (
        <KaKaoButtonStyled
            onClick={() => {
                window.location.href = kakaoAuthUrl;
            }}
        >
            <Image src="/images/chat.png" alt="chat_image" width={24} height={24} />
            카카오로 3초 만에 시작하기
        </KaKaoButtonStyled>
    );
};
export default LoginButton;

const KaKaoButtonStyled = styled.button`
    width: 242px;
    height: 45px;

    background-color: #fee500;
    border: none;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 500;
    cursor: pointer;

    img {
        margin-right: 14px;
    }
`;
