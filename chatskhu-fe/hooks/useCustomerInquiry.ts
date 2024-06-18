import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { userprofile } from '../store/profile';

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
    const { responseData } = userprofile();
    const myChatList = useCallback(async () => {
        if (responseData?.userRole === 'ROLE_USER') {
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
        } else {
            const response = await axios.get('https://chatskhu.duckdns.org/report/all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    pg: page,
                },
            });

            setReport({ ...response.data, currentPage: page });
        }
    }, [page]);

    useEffect(() => {
        myChatList();
    }, [myChatList]);

    return { report, setReport };
};
export default useMyInquiryList;
