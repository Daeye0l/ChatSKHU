import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Image from 'next/image'
import closebutton from '/public/images/closebutton.png'
import kakaoProfileImage from '/public/images/kakaoprofileimage.png'
import { theme } from '../styles/theme'
import { useStore } from '../store/\bstore'
import { motion, AnimatePresence } from 'framer-motion'
import QnA from './QnA'

const SidebarComponent = () => {
   const { setIsOpen } = useStore()
   // //날짜 생성 변수 (나중엔 백엔드에서 받아올 것)
   // const date = new Date()

   // const timeformat = new Intl.DateTimeFormat('en-US', {
   //    month: 'long',
   // }).format(date)

   return (
      <Container>
         <SideBarContainer>
            <SideBar>
               <div>
                  <Header
                     width='100%'
                     border='none'
                     padding='0.8rem 0em'
                     src='hunsu'
                     position='sticky'
                  />
                  <nav>
                     <QnA month={'Today'} />
                     <QnA month={'YesterDay'} />
                     <QnA month={'YesterDay'} />
                     <QnA month={'YesterDay'} />
                     <QnA month={'YesterDay'} />
                     <QnA month={'YesterDay'} />
                     <QnA month={'YesterDay'} />
                     <QnA month={'YesterDay'} />
                     <QnA month={'YesterDay'} />
                     <QnA month={'YesterDay'} />
                     <QnA month={'YesterDay'} />
                     <QnA month={'YesterDay'} />
                     <QnA month={'YesterDay'} />
                     <QnA month={'YesterDay'} />
                  </nav>
               </div>
               <SideBarFooter>
                  <div>
                     <Image
                        src={kakaoProfileImage}
                        width={40}
                        height={40}
                        alt='kakaoImageProfile'
                     />
                     <p>sina</p>
                  </div>
               </SideBarFooter>
            </SideBar>
            <button onClick={(prev) => setIsOpen(!prev)}>
               <Image
                  src={closebutton}
                  alt='hunsu_img'
                  width={15}
                  height={15}
               />
            </button>
         </SideBarContainer>
         <AnimatePresence>
            <SideBarBackground
               key='modal'
               initial={{ opacity: 0 }}
               animate={{
                  opacity: 1,
               }}
               exit={{ opacity: 0 }}
            ></SideBarBackground>
            {/* //일어나면 여기 다시 고쳐보기 */}
         </AnimatePresence>
      </Container>
   )
}
export default SidebarComponent

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;

  button {
    height: fit-content;
    border: 0;
    cursor: pointer;

    margin-top: 3em;
    margin-left: 0.5em;

    color: white;
    background-color: transparent;
    font-size: ${theme.fontSize.extraLarge};
  }
`
const SideBarContainer = styled(motion.div)`
  width: auto;
  position: absolute;
  height: 100vh;
  z-index: 100;
  display: flex;

  ::-webkit-scrollbar {
    width: 0.5rem;

  }

  ::-webkit-scrollbar-thumb {
    background-color: #e8e8e8;
    border-radius: 10rem;
  }

`
const SideBar = styled.nav`
  width: 20rem;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;


  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 10rem;
  }


  & > div {
    overflow-y: auto;
    background-color: #f8f8f8;
    padding: 0 0.8rem;
  }

`

const SideBarBackground = styled(motion.div)`
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
`

const SideBarFooter = styled.footer`
  & > div {
    padding : .5rem;
    display: flex;
    align-items: center;
    gap: 0.875rem;
    border-radius: ${theme.InputRadius.radius};
  }
  
  & > div:hover {
    background-color: #ececec;
  }
  div img {
    border-radius: 100%;
  }
  position: sticky;
  bottom: 0;
  padding: 0.8rem;
  background-color: #f8f8f8;

`
// 수정사항 : 헤더랑 푸터 둘다 배경이 투명해서 지나가는거 다보임 ㅋㅋㅋ
// 그리고 스크롤 호버할때만 보이도록 수정
