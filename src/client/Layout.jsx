import { Link } from "react-router-dom";
import useAuth from '@wasp/auth/useAuth';
import logout from '@wasp/auth/logout';
import "./Main.css";

export const Layout = ({ children }) => {
  const { data: user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary-800 text-white p-4">
        <div className="container mx-auto px-4 py-2 flex justify-between">
          <Link to="/">
            <h1 className="text-xl2 font-semibold">Blog</h1>
          </Link>
          { user ? (
            <span>
              Hi, {user.username}!{' '}
              <button onClick={logout} className="text-xl2 underline">
                (Log out)
              </button>
            </span>
          ) : (
            <Link to="/login">
              <h1 className="text-xl2 underline">Log in</h1>
            </Link>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-2 flex-grow">
        {children}
      </main>
      <footer>
        <div className="container mx-auto p-4">
          <p className="text-center text-gray-500 text-sm">
            Blog ~ Powered by Wasp
          </p>
        </div>
      </footer>
    </div>
  );
};