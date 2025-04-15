'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

 
  const isHomePage = pathname === '/';
 
  if (pathname === '/') return null;

  // Logout function to clear the token and redirect to home
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    router.push('/');
  };

  return (
    <nav className={`bg-gray-600 p-4 ${isHomePage ? 'flex justify-center' : 'flex justify-start'}`}>
      <ul className={`flex space-x-4 ${isHomePage ? 'justify-center' : ''}`}>
        <li>
          <Link href="/" className="text-white hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="/blog" className="text-white hover:text-gray-400">
            Blog
          </Link>
        </li>
        <li>
          <Link href="/create-blog" className="text-white hover:text-gray-400">
            Create Blog
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-400 bg-transparent border-none cursor-pointer"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
