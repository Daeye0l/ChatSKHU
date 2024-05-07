import axios from 'axios';
import { access } from 'fs';
import { useCallback, useEffect, useState } from 'react';
interface LoginToken {
    accessToken: 'string';
    refreshToken: 'string';
}
const CallBack = () => {
    //인증 토큰
    const [token, setToken] = useState<LoginToken>();

    if (typeof window !== 'undefined') {
        var query = new URL(window.location.href).searchParams.get('code');
    }

    const saveToken = useCallback(async () => {
        const response = await axios.get('https://chatskhu.duckdns.org/oauth/kakao/login', {
            params: { accessToken: query },
        });
        console.log(query);
        setToken(response.data);
    }, []);

    useEffect(() => {
        if (query) saveToken();
    }, [saveToken]);

    return <div>로딩중</div>;
};
export default CallBack;
