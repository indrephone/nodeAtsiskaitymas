import styled from 'styled-components';
import { CiFacebook } from "react-icons/ci";
import { AiOutlinePinterest } from "react-icons/ai";
import { PiTiktokLogoLight } from "react-icons/pi";

// Styling for the Footer container
const StyledFooter = styled.footer`
   height: 100px;
   display: flex;
   justify-content: space-around;  /* Space between the items */
   align-items: center;
   padding: 0 20px;
   background-color: #f0f0f0;
`;

// Styling for the Icons group
const IconGroup = styled.div`
   display: flex;
   gap: 15px; /* Gap between the icons */
`;

// Styling for the Address and Copyright text
const FooterText = styled.p`
   margin: 0;
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


           
