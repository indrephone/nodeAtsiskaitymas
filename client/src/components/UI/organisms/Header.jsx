import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
    height: 60px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "Gill Sans Extrabold", sans-serif;

    > a {
      
      height: 100px; 

      > img {
      margin-top: 30px;
      height: 100%;
      width: auto;
      }
    }

    > nav{
       
      >ul{
        margin: 0;
        padding: 0;
        display: flex;
        gap: 10px;

        > li{
          list-style-type: none;

          > a{
            text-decoration: none;
            font-size: 1.3rem;
            font-weight: 600;
            color: #feb47b;

            &:hover{
              color: red;
            }
            &.active{
              color: #ff7e5f;
            }
          }
        }
      }
    }
`;

const Header = () => {
    return ( 
        <StyledHeader>
         <Link to='/'>
         <img 
          src="/library_logo.png"
          alt="library logo" 
          />
         </Link>
           
            <nav>
              <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/books">All Books</NavLink></li>
              </ul>  
            </nav>
        </StyledHeader>
     );
}
 
export default Header;