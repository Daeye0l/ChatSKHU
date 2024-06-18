import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

interface Data {
    id: number;
    title: string;
    content: string;
    answer: string;
    createdDate: Date;
    modifiedDate: Date;
    nickName: string;
}
interface Props {
    reports: Data[];
    totalPage: number;
    currentPage: number;
}
const defaultProps: Props = {
    reports: [],
    totalPage: 0,
    currentPage: 0,
};

const useMyInquiryList = ({ page = 1 }) => {
    const [report, setReport] = useState<Props>(defaultProps);

    const myChatList = useCallback(async () => {
        try {
            const response = await axios.get('https://chatskhu.duckdns.org/report/list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    pg: page,
                },
            });

            setReport({ ...response.data, currentPage: page });
        } catch (error) {}
    }, [page]);

    useEffect(() => {
        myChatList();
    }, [myChatList]);

    return { report, setReport };
};
export default useMyInquiryList;
