import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface Props {
    src: StaticImageData;
    alt: string;
}

interface MyObject {
    [key: string]: string;
    북마크: string;
    프로필: string;
    버그신고: string;
}

const IconComponent = (props: Props) => {
    const router = useRouter();
    const { alt, ...rest } = props; // alt를 props에서 추출하고 나머지 속성들을 rest에 저장
    const routerArray: MyObject = {
        북마크: '/mypage/bookmark',
        프로필: '/mypage/profile',
        버그신고: '/mypage/customer_center',
    };
    const onClick = () => {
        router.push(routerArray[alt]);
    };
    return (
        <ItemContainer>
            <Image width={40} height={40} alt={alt} onClick={onClick} {...rest} />
            <p>{alt}</p>
        </ItemContainer>
    );
};

export default IconComponent;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img:first-child {
        margin: 0.6rem;
        cursor: pointer;
    }

    p {
        font-size: 0.7rem;
    }
`;
