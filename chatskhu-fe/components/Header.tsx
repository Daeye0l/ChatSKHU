import Image from 'next/image';
import styled from 'styled-components';
import sidebar from '/public/images/sidebar.png';
import addbutton from '/public/images/addbutton.png';
import hunsu from '/public/images/hunsu.png';
import { theme } from '../styles/theme';
import { useStore } from '../store/store';
import { useRouter } from 'next/router';

interface Props {
    width?: string;
    position?: string;
    border?: string;
    padding?: string;
    src?: string;
}
const Header = ({ ...props }: Props) => {
    const img_src = props.src;
    const { isOpen, setIsOpen } = useStore();
    const router = useRouter();

    return (
        <>
            <HeaderContainer {...props}>
                {img_src ? (
                    <Image src={hunsu} alt="sidebar_logo" width={40} height={40} />
                ) : (
                    <div
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        <Image src={sidebar} alt="sidebar_logo" width={20} height={20} />
                    </div>
                )}
                <span>ChatSKHU</span>
                <Image
                    onClick={() => {
                        router.push('/main');
                        setIsOpen(false);
                    }}
                    src={addbutton}
                    alt="sidebar_logo"
                    width={20}
                    height={20}
                />
            </HeaderContainer>
        </>
    );
};
export default Header;

const HeaderContainer = styled.header<Props>`
    width: ${(props) => props.width || `390px`};
    padding: ${(props) => props.padding || `0.8em 0.5em`};

    display: flex;
    ${(props) => (props.position === 'sticky' ? `position:sticky` : `position : fixed`)};
    top: 0px;
    align-items: center;

    z-index: 1;
    background-color: inherit;
    border-bottom: ${(props) => props.border || `0.2px solid ${theme.color.grayColor}`};

    span {
        font-size: 20px;
        font-weight: 600;
        flex-grow: 1;
        text-align: center;
    }

    img {
        cursor: pointer;
    }
`;
