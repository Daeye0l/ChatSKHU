import { styled } from 'styled-components';
import MypageLayout from '../../../components/layout/MypageLayout';
import { userprofile } from '../../../store/profile';
import Image, { StaticImageData } from 'next/image';
import MypageButton from '../../../components/MypageButton';
import { useCallback, useState } from 'react';
import axios from 'axios';
import defaultProfile from '/public/images/profileIMG.png';
import { useRouter } from 'next/router';

const Profile = () => {
    const { responseData: userData, setResponseData } = userprofile();
    const [name, setName] = useState(userData?.nickname ?? '');
    const img_url: string | StaticImageData = userData?.imageUrl?.includes('default')
        ? defaultProfile
        : userData?.imageUrl || defaultProfile;
    const router = useRouter();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name) {
            alert('닉네임을 한 자 이상 입력해주세요.');
            return;
        }
        if (userData) {
            setResponseData({ ...userData, nickname: name });
            onInfoChange(name);
        }
    };

    const onInfoChange = useCallback(
        async (userName: string) => {
            try {
                const response = await axios.post(
                    'https://chatskhu.duckdns.org/user/update',
                    { nickname: userName },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log(response.data);
                setResponseData(response.data);
                router.push('/mypage/info');
            } catch (error) {
                console.error('Error updating user info:', error);
                alert('업데이트 중 오류가 발생했습니다.');
            }
        },
        [setResponseData]
    );

    return (
        <MypageLayout pagename="프로필">
            <ProfileContainer>
                <ImgContainer>
                    <Image src={img_url} width={85} height={85} alt="mypage" />
                </ImgContainer>
                <form onSubmit={onSubmitHandler}>
                    <InputContainer>
                        <label>닉네임</label>
                        <input value={name} onChange={onChangeHandler} maxLength={5} />
                        {name === '' && <AlertCss>닉네임을 입력해주세요!</AlertCss>}
                    </InputContainer>
                    <MypageButton nickname={name.length} />
                </form>
            </ProfileContainer>
        </MypageLayout>
    );
};

export default Profile;

const ImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 4rem;

    img {
        border-radius: 100%;
        /* margin-bottom: 1rem; */
        object-fit: none;
    }
`;

const ProfileContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 20% 0% 70% 0%;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem;

    input {
        padding: 0.8rem;
        border-radius: 1rem;
        border: 1px solid lightgray;
        margin-bottom: 0.3rem;
    }
    input:focus {
        outline: none;
    }

    label {
        margin-bottom: 0.4rem;
    }
`;

const AlertCss = styled.p`
    font-size: 0.8rem;
    color: red;
`;
