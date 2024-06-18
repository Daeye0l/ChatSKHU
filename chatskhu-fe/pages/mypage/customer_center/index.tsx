import { styled } from 'styled-components';
import MypageLayout from '../../../components/layout/MypageLayout';
import { useRouter } from 'next/router';
import useCustomerInquiry from '../../../hooks/useCustomerInquiry';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const CoutomerCenter = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const { report } = useCustomerInquiry({ page });

    const onClickHandler = () => {
        router.push('/mypage/customer_center/create');
    };

    const handlePageClick = (event: { selected: number }) => {
        console.log(event);
        const selectedPage = event.selected + 1; // selected는 0부터 시작하므로 +1
        setPage(selectedPage);
    };

    return (
        <MypageLayout pagename="문의">
            <Container>
                <button onClick={onClickHandler}>글쓰기</button>
                <div>
                    {report?.reports.map((item, idx) => (
                        <ItemConinater
                            key={idx}
                            onClick={() => {
                                router.push({
                                    pathname: `/mypage/customer_center/${item.id}`,
                                    query: { title: item.title, content: item.content },
                                });
                            }}
                        >
                            <span>{item.title}</span>
                            <span>{item.nickName}</span>
                        </ItemConinater>
                    ))}
                </div>
            </Container>
            <StyledPaginateContainer>
                <StyledReactPaginate pageCount={report.totalPage} onPageChange={handlePageClick}></StyledReactPaginate>
            </StyledPaginateContainer>
        </MypageLayout>
    );
};
export default CoutomerCenter;

const Container = styled.div`
    height: 100%;
    width: 100%;
    text-align: right;

    button {
        align-self: end;
        background: black;
        color: white;
        padding: 0.5rem 1.5rem;
        border: none;
        border-radius: 0.8rem;
        font-weight: 900;
        cursor: pointer;
        margin-bottom: 1rem;
    }
`;

const ItemConinater = styled.div`
    border: 1px solid lightGray;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    text-align: left;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    span:last-child {
        font-size: 0.8rem;
    }
    &:hover {
        background-color: lightgray;
    }
`;

const StyledPaginateContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const StyledReactPaginate = styled(ReactPaginate)`
    display: flex;
    list-style: none;
    padding: 0;
    li {
        margin: 0 5px;
        display: block;
        border-radius: 2rem;
        text-decoration: none;
        color: black;
        cursor: pointer;
        border: 1px solid gray;
        padding: 1rem;
        margin-bottom: 1rem;

        &.active {
            a {
                background-color: black;
                color: white;
            }
        }

        a {
            display: block;
            border-radius: 2rem;
            text-decoration: none;
            color: black;
            cursor: pointer;

            &:hover {
                background-color: lightgray;
            }
        }
    }
`;
