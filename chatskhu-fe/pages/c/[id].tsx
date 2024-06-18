import { styled } from 'styled-components';
import Input from '../../components/Input';
import Layout from '../../components/layout/Layout';
import Conversation from '../../components/Conversation';
import useConversationList from '../../hooks/useConversationList';
import { useStore } from '../../store/store';
import Sidebar from '../../components/Sidebar';

const Chat = () => {
    const { isOpen } = useStore();
    var chatRoom = 0;
    if (typeof window !== 'undefined') {
        const currentUrl = window.location.href;
        const index = currentUrl.lastIndexOf('/');
        chatRoom = Number(currentUrl.slice(index + 1, currentUrl.length));
    }
    const [list] = useConversationList(chatRoom);

    return (
        <Layout>
            <EntireContainer>
                <Conversation list={list} />
            </EntireContainer>
            <Input />
            {isOpen && <Sidebar />}
        </Layout>
    );
};
export default Chat;

const EntireContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;
