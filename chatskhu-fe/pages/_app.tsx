import "../styles/globals.css";
import { createGlobalStyle } from "styled-components";
import type { AppProps } from "next/app";

const GlobalStyle = createGlobalStyle`
  #__next {
    width: 390px;
    
    margin: 0 auto;
    display: flex;

    flex-direction: column;
    align-items: center;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
