// web/src/layouts/MainLayout/MainLayout.js

import Navbar from 'src/components/NavBar/NavBar';
import Footer from 'src/components/Footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
