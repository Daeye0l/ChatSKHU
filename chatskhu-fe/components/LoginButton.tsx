import styled from "styled-components";
import Image from "next/image";

const LoginButton = () => {
  return (
    <KaKaoButtonStyled>
      <Image src="/images/chat.png" alt="chat_image" width={24} height={24} />
      카카오로 3초 만에 시작하기
    </KaKaoButtonStyled>
  );
};
export default LoginButton;

const KaKaoButtonStyled = styled.button`
  width: 242px;
  height: 45px;

  margin-top: 10em;

  background-color: #fee500;
  border: none;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 500;

  img {
    margin-right: 14px;
  }
`;
