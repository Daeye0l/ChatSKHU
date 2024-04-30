import styled from 'styled-components';
import LoginButton from '../../components/LoginButton';
import Logo from '../../components/Logo';

const login = () => {
    return (
        <LoginContainer>
            <Logo />
            <LoginButton />
        </LoginContainer>
    );
};
export default login;

const LoginContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;
