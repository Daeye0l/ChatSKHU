import { styled } from 'styled-components';

interface Props {
    nickname: number;
}
const MypageButton = ({ nickname }: Props) => {
    return <ButtonStyle nickname={nickname}>완료</ButtonStyle>;
};
export default MypageButton;

const ButtonStyle = styled.button<Props>`
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 2rem;
    color: white;
    font-weight: 900;
    cursor: pointer;
    background-color: ${({ nickname }) => (nickname ? 'black' : 'lightgray')};
`;
