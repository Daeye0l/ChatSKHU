import styled from 'styled-components'
import { theme } from '../styles/theme'
import arrow from '/public/images/arrow.png'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Prop {
   variants: {
      hidden: {
         y: number
         opacity: number
      }
      visible: {
         y: number
         opacity: number
      }
   }
}

const FAQ = ({ ...props }: Prop) => {
   return (
      <FAQContainer {...props}>
         <div>
            <div>수강신청</div>
            <div>수강신청에 대해서 궁금한가요?</div>
         </div>
         <Image src={arrow} alt="FAQ" width={30} height={30} />
      </FAQContainer>
   )
}
export default FAQ

const FAQContainer = styled(motion.li)`
   padding: 1.3em;
   width: 100%;
   border: 1px solid ${theme.color.grayColor};
   border-radius: ${theme.InputRadius.radius};
   margin-bottom: 0.3em;
   cursor: pointer;

   display: flex;
   justify-content: space-between;
   align-items: center;
   &:hover {
      background-color: #f8f8f8;
   }

   img {
      display: none;
   }
   &:hover img {
      display: block;
   }

   div div:first-child {
      font-weight: 900;
      font-size: 20px;
      margin-bottom: 0.2em;
   }
   div div:last-child {
      font-size: 11px;
   }
`
