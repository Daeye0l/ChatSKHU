import React from 'react';
import useKaKaoToken from '../../../hooks/useLogin';

const CallBack = () => {
    const [token] = useKaKaoToken();
    return <div>로딩중</div>;
};
export default React.memo(CallBack);
