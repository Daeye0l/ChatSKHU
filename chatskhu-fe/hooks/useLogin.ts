import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

interface LoginToken {
    accessToken: string;
    refreshToken: string;
}

const useKaKaoToken = () => {
    const [token, setToken] = useState();
    const router = useRouter();

    const handleKaKaoLogin = useCallback(async () => {
        try {
            const code = new URLSearchParams(window.location.search).get('code');
            const kakaoResponse = await axios.get('https://chatskhu.duckdns.org/oauth/kakao/callback', {
                params: { code },
            });

            setToken({ ...kakaoResponse.data });
            const data = kakaoResponse.data.accessToken;
            const res = await axios.post('https://chatskhu.duckdns.org/oauth/kakao/login', {
                accessToken: data,
            });
            console.log(res);

            if (res.status === 200) {
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                router.push('/main');
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        handleKaKaoLogin();
    }, []);

    return [token];
};

export default useKaKaoToken;
