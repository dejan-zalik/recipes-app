import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '@/components/AuthProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

export const metadata = {
  title: 'whatscookin',
  keywords: 'recipe,cook',
  description: 'store and browse recipes, and cook with ease',
};

const MainLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <AuthProvider session={session}>
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
