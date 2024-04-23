import kakaoProfileImage from '/public/images/kakaoprofileimage.png';
import Image from 'next/image';
import bug from '/public/images/icon-siren.png';
import settings from '/public/images/icon-setting.png';
import bookmark from '/public/images/icon-bookmark.png';
import backarrow from '/public/images/left-icon.png';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const MyPage = () => {
    return (
        <>
            <div>
                <Image src={backarrow} width={20} height={20} alt="backarrow" />
            </div>
            <h3>마이페이지</h3>
            <Container>
                <ItemContainer>
                    <Image src={kakaoProfileImage} width={85} height={85} alt="mypage" />
                    <p>김신아</p>
                </ItemContainer>
                <FlexContainer>
                    <ItemContainer>
                        <Image src={bookmark} width={40} height={40} alt="bookmark" />
                        <p>북마크</p>
                    </ItemContainer>
                    <ItemContainer>
                        <Image src={settings} width={40} height={40} alt="bookmark" />
                        <p>설정</p>
                    </ItemContainer>
                    <ItemContainer>
                        <Image src={bug} width={40} height={40} alt="bookmark" />
                        <p>버그신고</p>
                    </ItemContainer>
                </FlexContainer>
            </Container>
            <FooterContainer>
                <table>
                    <thead>
                        <tr>
                            <td>(주) 캡디사업자 정보</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>대표이사</td>
                            <td>김신아</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>주소</td>
                            <td>서울특별시 구로구 연동로 320</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>문의전화</td>
                            <td>02-2610-4123</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>fdsklafjlkdsaf@gmail.com</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </FooterContainer>
        </>
    );
};
export default MyPage;

const Container = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    border-radius: 1rem;
    border: 0.01rem solid ${theme.color.grayColor};
`;

const FlexContainer = styled.div`
    display: flex;
`;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    img {
        margin: 0.5rem;
        border-radius: 100%;
    }
`;

const FooterContainer = styled.footer`
    width: 100%;
    background-color: #f0f3f4;

    position: sticky;
    bottom: 0;

    table {
        padding: 1rem;
        border-collapse: separate;
        border-spacing: 1rem;
        table-layout: fixed;
        width: 100%;
    }

    tbody td:first-child {
    }

    td {
        color: #a4a4a4;
        font-size: 0.8rem;
        white-space: nowrap;
    }

    thead tr td {
        font-size: 1rem;
        font-weight: 800;
    }
`;
