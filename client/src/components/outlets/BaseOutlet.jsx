import { Outlet } from "react-router-dom";
import Header from "../UI/organisms/Header";
import Footer from "../UI/organisms/Footer";

const BaseOutlet = () => {
    return ( 
        <>
         <Header />
         <Outlet />
         <Footer />
        </>
     );
}
 
export default BaseOutlet;