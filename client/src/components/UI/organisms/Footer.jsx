import styled from 'styled-components';
import { CiFacebook } from "react-icons/ci";
import { AiOutlinePinterest } from "react-icons/ai";
import { PiTiktokLogoLight } from "react-icons/pi";

// Styling for the Footer container
const StyledFooter = styled.footer`
   height: 120px;
   display: flex;
   justify-content: space-around; 
   align-items: center;
   padding: 0 20px;
   background-color: #f0f0f0;
`;
const IconGroup = styled.div`
   display: flex;
   gap: 20px;
   font-size: 2rem;
`;
const FooterText = styled.p`
   margin: 0;
   font-size: 1.2rem;
`;

const Footer = () => {
    return ( 
        <StyledFooter>
            <FooterText>Our address: Peony St. 45, Rossdale, Illinois</FooterText>
            <FooterText>&copy; Indre 2024</FooterText>
            <IconGroup>
              <CiFacebook />
              <AiOutlinePinterest />
              <PiTiktokLogoLight />
            </IconGroup>
           
        </StyledFooter>
     );
}
 
export default Footer;


           
