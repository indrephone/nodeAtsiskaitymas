import styled from 'styled-components';

const StyledFooter = styled.footer`
   height: 100px;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const Footer = () => {
    return ( 
        <StyledFooter>
            <p>&copy; Indre 2024</p>
        </StyledFooter>
     );
}
 
export default Footer;