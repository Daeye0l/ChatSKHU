import React from 'react';
import useKaKaoToken from '../../../hooks/useLogin';
import Spinner from '../../../public/spinner.svg';
import { styled } from 'styled-components';

const CallBack = () => {
    const [token] = useKaKaoToken();
    return (
        <SpinnerContainer>
            <Spinner />
        </SpinnerContainer>
    );
};
export default React.memo(CallBack);
const SpinnerContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;
