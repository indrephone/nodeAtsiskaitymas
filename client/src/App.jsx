import {Routes, Route } from 'react-router-dom';
import BaseOutlet from './components/outlets/BaseOutlet';
import Home from './components/pages/Home';
import AllBooks from './components/pages/AllBooks';
import SpecificBook from './components/pages/SpecificBook';


const App = () => {
  return (
   <Routes>
      <Route path='' element={<BaseOutlet />} >
         <Route index element={<Home />} />
         <Route path='/books' element={<AllBooks />} />
         <Route path=':id' element={<SpecificBook />} />
       </Route>
   </Routes>
  );
}
export default App;


