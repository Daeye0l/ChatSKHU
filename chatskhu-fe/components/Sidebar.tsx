import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Image from 'next/image'
import closebutton from '/public/images/closebutton.png'
import { theme } from '../styles/theme'
import { useStore } from '../store/\bstore'
import { motion, AnimatePresence } from 'framer-motion'

const SidebarComponent = () => {
   const { setIsOpen } = useStore()
   return (
      <Container>
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
               <Image
                  src={closebutton}
                  alt="hunsu_img"
                  width={15}
                  height={15}
               />
            </button>
         </SideBarContainer>
         <AnimatePresence>
            <SideBarBackground
               key="modal"
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
`
const SideBar = styled.div`
   width: 20rem;
   padding: 2em 1em;
   background-color: white;
`

const SideBarBackground = styled(motion.div)`
   width: 100%;
   background: rgba(0, 0, 0, 0.3);
   z-index: 1;
`
