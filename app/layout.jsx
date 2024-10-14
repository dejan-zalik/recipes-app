import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'whatscookin',
  keywords: 'recipe,cook',
  description: 'store and browse recipes, and cook with ease',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html>
        <body className="max-w-6xl m-auto">
          <Navbar />
          <main>{children}</main>
          <ToastContainer autoClose={1000} />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
