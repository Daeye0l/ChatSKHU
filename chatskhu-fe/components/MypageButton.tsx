import { FormEvent, MouseEvent } from 'react';
import { styled } from 'styled-components';

interface Props {
    nickname: number;
    onNickNameHandler: (e: FormEvent<HTMLFormElement>) => void;
}

const MypageButton = ({ nickname, onNickNameHandler }: Props) => {
    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent default button click behavior
        // Create a synthetic form event and call the handler
        const syntheticEvent = {
            ...e,
            currentTarget: e.currentTarget.closest('form'),
        } as unknown as FormEvent<HTMLFormElement>;
        onNickNameHandler(syntheticEvent);
    };

    return (
        <ButtonStyle nickname={nickname} onClick={onClickHandler}>
            완료
        </ButtonStyle>
    );
};
export default MypageButton;

const ButtonStyle = styled.button<Omit<Props, 'onNickNameHandler'>>`
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 2rem;
    color: white;
    font-weight: 900;
    cursor: pointer;
    background-color: ${({ nickname }) => (nickname ? 'black' : 'lightgray')};
`;
