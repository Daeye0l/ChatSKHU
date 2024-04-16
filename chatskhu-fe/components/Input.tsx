import styled from 'styled-components'
import Image from 'next/image'
import arrowup from '/public/images/arrowup.png'
import FAQ from './FAQ'
import { theme } from '../styles/theme'
import { motion } from 'framer-motion'

const Input = () => {
   const container = {
      hidden: { opacity: 1, scale: 0 },
      visible: {
         opacity: 1,
         scale: 1,
         transition: {
            delayChildren: 0.2,
            staggerChildren: 0.1,
         },
      },
   }

   const item = {
      hidden: { y: 20, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
      },
   }

   return (
      <Footer>
         <FAQsContainer initial="hidden" animate="visible" variants={container}>
            {[0, 1, 2].map((index) => (
               <FAQ key={index} variants={item} />
            ))}
         </FAQsContainer>
         <InputContainer>
            <textarea placeholder="궁금한 점을 입력해주세요..." />
            <Image src={arrowup} alt="입력전_화살표" width={30} height={30} />
         </InputContainer>
      </Footer>
   )
}

const Footer = styled.footer`
   width: 95%;
   margin-bottom: 1em;
   background-color: white;

   /* position: fixed;
  z-index: 1;
  bottom: 0; */
`
const InputContainer = styled.form`
   width: 100%;
   padding: 0.7em;

   display: flex;
   justify-content: space-between;

   border: 1px solid ${theme.color.grayColor};
   border-radius: ${theme.InputRadius.radius};

   background-color: white;

   textarea,
   textarea:focus {
      width: 100%;
      border: none;
      outline: none;
      resize: none;
   }
   img {
      cursor: pointer;
   }
`

const FAQsContainer = styled(motion.ul)`
   width: 100%;
`

export default Input
