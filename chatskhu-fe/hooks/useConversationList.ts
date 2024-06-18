import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

type ListType = {
    id: number;
    question: string;
    answer: string;
    createdDate: Date;
    chatRoomId: number;
    bookmarked: boolean;
};

const useConversationList = (chatRoom: number, updateTrigger: any) => {
    const [list, setList] = useState<ListType[]>([]);

    const handleConversationList = useCallback(async () => {
        try {
            const response = await axios.get(`https://chatskhu.duckdns.org/chat/${chatRoom}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });
            setList(response.data);
        } catch (error) {
            console.error('Error fetching conversation list', error);
        }
    }, [chatRoom]);

    useEffect(() => {
        handleConversationList();
    }, [handleConversationList, updateTrigger]);

    return [list];
};

export default useConversationList;
