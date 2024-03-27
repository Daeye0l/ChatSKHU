import styled from "styled-components";
import Header from "./Header";
import { theme } from "../styles/theme";
import Image from "next/image";
import closebutton from "/public/images/closebutton.png";
import { useStore } from "../store/\bstore";

const Sidebar = () => {
  const { setIsOpen } = useStore();
  return (
    <SideBarContainer>
      <SideBar>
        <Header
          width="100%"
          border="none"
          padding="0"
          src="hunsu"
          position={true}
        />
      </SideBar>
      <button onClick={(prev) => setIsOpen(!prev)}>
        <Image src={closebutton} alt="hunsu_img" width={15} height={15} />
      </button>
    </SideBarContainer>
  );
};
export default Sidebar;

const SideBarContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(1, 1, 1, 0.3);
  z-index: 2;

  button {
    cursor: pointer;
    height: fit-content;
    border: 0;
    margin-top: 3.5em;
    margin-left: 0.5em;
    color: white;
    background-color: transparent;
    font-size: ${theme.fontSize.extraLarge};
  }
`;
const SideBar = styled.div`
  width: 80%;
  height: 100vh;
  padding: 2em 1em;
  background-color: white;
  align-items: center;
`;
