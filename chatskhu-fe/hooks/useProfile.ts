import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { userprofile } from '../store/profile';

interface Props {
    id: number;
    email: string;
    nickname: string;
    userRole: string;
    socialType: string;
    imageUrl: string;
}
const useProfile = () => {
    const [profile, setProfile] = useState<Props>();

    const myProfile = useCallback(async () => {
        try {
            const response = await axios.get('https://chatskhu.duckdns.org/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });

            userprofile.getState().setResponseData(response.data);
            setProfile(response.data);
        } catch (error) {
            console.log('error: ', error);
        }
    }, []);

    useEffect(() => {
        myProfile();
    }, []);

    return [profile];
};
export default useProfile;
