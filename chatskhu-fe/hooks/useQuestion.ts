import axios from 'axios';
import { useEffect, useState } from 'react';

interface Question {
    id: number;
    title: string;
    content: string;
    answer: string;
    createdDate: string;
    modifiedDate: string;
    nickName: string;
}
const useQuestion = () => {
    const [question, setQuestion] = useState<Question[]>();
    const questionHandle = async () => {
        try {
            const response = await axios.get('https://chatskhu.duckdns.org/report/list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });
            setQuestion(response.data);
        } catch (error) {
            console.log('error :', error);
        }
    };

    useEffect(() => {
        questionHandle();
    }, []);
    return [question];
};
export default useQuestion;
