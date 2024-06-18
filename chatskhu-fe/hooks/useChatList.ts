import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

interface Date {
    id: number;
    title: string;
    userId: number;
}
interface Props {
    today: Date[];
    yesterday: Date[];
    week: Date[];
    month: Date[];
}
const useChatList = () => {
    const [chatList, setChatList] = useState<Props>();

    const myChatList = useCallback(async () => {
        try {
            const response = await axios.get('https://chatskhu.duckdns.org/chat/chatroom', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });

            setChatList(response.data);
        } catch (error) {}
    }, []);

    useEffect(() => {
        myChatList();
    }, []);

    return [chatList];
};
export default useChatList;
