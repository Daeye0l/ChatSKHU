import Image, { StaticImageData } from 'next/image';
import bug from '/public/images/icon-siren.png';
import profile from '/public/images/profile.png';
import bookmark from '/public/images/icon-bookmark.png';

import styled from 'styled-components';
import { theme } from '../styles/theme';
import { userprofile } from '../store/profile';
import IconComponent from './IconComponent';
import MypageLayout from './layout/MypageLayout';
import defaultProfile from '/public/images/profileIMG.png';

const MyPage = () => {
    const { responseData: userData } = userprofile();
    const img_url: string | StaticImageData = userData?.imageUrl?.includes('default')
        ? defaultProfile
        : userData?.imageUrl || defaultProfile;
    return (
        <MypageLayout pagename="마이페이지">
            <Container>
                <ImgContainer>
                    <Image src={img_url} width={85} height={85} alt="mypage" />
                    <p>{userData?.nickname}</p>
                </ImgContainer>
                <FlexContainer>
                    <IconComponent src={bookmark} alt={'북마크'} />
                    <IconComponent src={profile} alt={'프로필'} />
                    <IconComponent src={bug} alt={'버그신고'} />
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
        </MypageLayout>
    );
};
export default MyPage;

const Container = styled.div`
    width: 80%;
    height: 20rem;
    display: flex;
    flex-direction: column;

    justify-content: space-around;
    align-items: center;

    border-radius: 1rem;
    border: 0.01rem solid ${theme.color.grayColor};
`;

const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`;
const ImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        border-radius: 100%;
        margin-bottom: 1rem;
        object-fit: none;
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
