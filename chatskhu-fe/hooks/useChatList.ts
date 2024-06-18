import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

interface ChatItem {
    id: number;
    title: string;
    userId: number;
}

interface ChatListProps {
    today: ChatItem[];
    yesterday: ChatItem[];
    week: ChatItem[];
    month: ChatItem[];
    other: ChatItem[];
}

const useChatList = (): [ChatListProps | undefined, () => Promise<void>] => {
    const [chatList, setChatList] = useState<ChatListProps | undefined>(undefined);

    const fetchChatList = useCallback(async () => {
        try {
            const response = await axios.get('https://chatskhu.duckdns.org/chat/chatroom', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });
            setChatList(response.data);
        } catch (error) {
            console.error('Failed to fetch chat list', error);
        }
    }, []);

    useEffect(() => {
        fetchChatList();
    }, [fetchChatList]);

    return [chatList, fetchChatList];
};

export default useChatList;
