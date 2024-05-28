import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
type a = {
    question: string;
    answer: string;
    createdDate: Date;
};
const useConversationList = () => {
    const [list, setList] = useState<a[]>([]);
    const handleConversationList = useCallback(async () => {
        try {
            const response = await axios.get('https://chatskhu.duckdns.org/gpt/chat', {
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
    }, []);

    useEffect(() => {
        handleConversationList();
    }, []);

    return [list];
};

export default useConversationList;
