import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
type ListType = {
    id: number;
    question: string;
    answer: string;
    createdDate: Date;
    chatRoomId: number;
};

const useConversationList = (chatRoom: number) => {
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
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [chatRoom]);

    useEffect(() => {
        const intervalId = setInterval(handleConversationList, 1000); // 1000ms 간격으로 API 호출
        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
    }, [handleConversationList]);

    return [list];
};

export default useConversationList;
