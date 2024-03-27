import type { ReactNode } from "react";
import Header from "../Header";
import styled from "styled-components";
import { useStore } from "../../store/\bstore";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <LayoutContainer>
      <Header />
      {children}
    </LayoutContainer>
  );
};
export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`;
