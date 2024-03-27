import Image from "next/image";
import speechbubble from "/public/images/chat.png";
import styled from "styled-components";
import Input from "../components/Input";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/Sidebar";
import { useStore } from "../store/\bstore";

const Main = () => {
  const { isOpen } = useStore();
  return (
    <Layout>
      <EntireContainer>
        <Presentation>
          <DefaultImg>
            <Image
              src={speechbubble}
              width={80}
              height={80}
              alt="speechbubble"
            />
            <div>무엇이 궁금한가요?</div>
          </DefaultImg>
          <Input />
        </Presentation>
      </EntireContainer>
      {isOpen && <Sidebar />}
    </Layout>
  );
};
export default Main;
const EntireContainer = styled.div`
  width: 100%;
  position: relative;
`;
const Presentation = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DefaultImg = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 3.2em;
  flex-grow: 1;
  img {
    margin-bottom: 0.5em;
  }
  div {
    font-weight: 100;
  }
`;
