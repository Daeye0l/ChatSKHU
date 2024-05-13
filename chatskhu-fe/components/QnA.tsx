import styled from 'styled-components';
import { useStore } from '../store/\bstore';

interface Props {
    month: string;
}
const QnA = ({ month }: Props) => {
    const { setIsOpen } = useStore();
    return (
        <QnAContainer>
            <DateStyle>{month}</DateStyle>
            {
                <ConversationList onClick={(prev) => setIsOpen(!prev)}>
                    <li>쿡쿡fdsafsjalkfjsalkfdjsklafjslkajflkfdsafdsafkldsajfksjflksjaflkjasljfljsafjkjalfja</li>
                </ConversationList>
            }
        </QnAContainer>
    );
};
export default QnA;

const QnAContainer = styled.div`
    margin-top: 1.25rem;
`;
const DateStyle = styled.div`
    padding: 0.75rem 0.5rem 0.5rem 0.5rem;
    color: gray;
    font-size: 0.7rem;
    font-weight: bold;
`;
const ConversationList = styled.ol`
    li {
        padding: 0.5rem;
        border-radius: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
            background-color: #ececec;
            cursor: pointer;
        }
    }
`;
