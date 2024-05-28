import { styled } from 'styled-components';
import Input from '../../components/Input';
import Layout from '../../components/layout/Layout';
import Conversation from '../../components/Conversation';

const chat = () => (
    <Layout>
        <EntireContainer>
            <Conversation />
        </EntireContainer>
        <Input />
    </Layout>
);
export default chat;

const EntireContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const Presentation = styled.div`
    display: flex;

    flex-direction: column;
    align-items: center;
    margin: 50% 0 50% 0;
`;
const CenterContainer = styled.main`
    width: 95%;
    display: flex;
    flex-direction: column;
`;
