import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'whatscookin',
  keywords: 'recipe,cook',
  description: 'store and browse recipes, and cook with ease',
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <ToastContainer autoClose={1000} />
      </body>
    </html>
  );
};

export default MainLayout;
