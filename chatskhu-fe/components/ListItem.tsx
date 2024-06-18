import axios from 'axios';
import { useStore } from '../store/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import pencil from '/public/images/pencil.png';
import removebutton from '/public/images/removebutton.png';
import { styled } from 'styled-components';
import useChatList from '../hooks/useChatList';
import { useList } from '../store/conversationstore';

interface Props {
    id: number;
    title: string;
    onDeleteHandler: (e: React.MouseEvent<HTMLImageElement>, id: number) => void;
}
interface Item {
    id: number;
    title: string;
    userId: number;
}
const ListItem = ({ id, title: itemTitle, onDeleteHandler }: Props) => {
    const [title, setTitle] = useState('');
    const [show, setShow] = useState(false);
    const router = useRouter();
    const { setIsOpen } = useStore();
    const { setResponseData } = useList();
    const [chatList, setChatList] = useChatList();

    const onUpdateHandler = async (e: React.FormEvent<HTMLFormElement>, chatRoomId: number) => {
        e.stopPropagation();
        setShow((prev) => !prev);
        try {
            await axios.put(
                `https://chatskhu.duckdns.org/chat/chatroom/${chatRoomId}`,
                {
                    title: title,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setChatList();
        } catch (e) {
            console.log(e);
        }
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    const onInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onUpdateHandler(event, id);
    };

    useEffect(() => {
        if (chatList) {
            setResponseData(chatList);
        }
    }, [chatList, setResponseData]);
    return (
        <>
            <ConversationList
                onClick={(prev: any) => {
                    setIsOpen(!prev);
                    router.push(`/c/${id}`);
                }}
                key={id}
            >
                <li>
                    <form onSubmit={onSubmitHandler}>
                        {show && <input type="text" value={title} onChange={onChangeHandler} onClick={onInputClick} />}
                        {!show && <span>{itemTitle}</span>}
                    </form>
                    <div>
                        <Image
                            src={pencil}
                            width={10}
                            height={10}
                            alt={'수정 버튼'}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShow((prev) => !prev);
                            }}
                        />
                        <Image
                            src={removebutton}
                            width={10}
                            height={10}
                            alt={'삭제 버튼'}
                            onClick={(e) => onDeleteHandler(e, id)}
                        />
                    </div>
                </li>
            </ConversationList>
        </>
    );
};
export default ListItem;

const ConversationList = styled.ol`
    li {
        padding: 0.5rem;
        border-radius: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        justify-content: space-between;

        img {
            cursor: pointer;
        }
        img:first-child {
            margin-right: 1rem;
        }

        &:hover {
            background-color: #ececec;
            cursor: pointer;
        }

        div {
            visibility: hidden;
        }

        &:hover div {
            visibility: visible;
        }
    }
`;
function setResponseData(arg0: (prevState: any) => any) {
    throw new Error('Function not implemented.');
}
