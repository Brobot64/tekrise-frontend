import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Calendar, User as UserIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary-blue text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold tracking-wider hover:opacity-90 transition-opacity">
              TEK<span className="text-primary-red">RISE</span> TEST
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/" className="flex items-center space-x-1 hover:text-gray-300 transition-colors">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/bookings" className="flex items-center space-x-1 hover:text-gray-300 transition-colors">
                  <Calendar size={18} />
                  <span>Bookings</span>
                </Link>
                <div className="flex items-center space-x-4 border-l border-gray-500 pl-6 ml-4">
                  <div className="flex items-center space-x-2">
                    <UserIcon size={18} />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 bg-primary-red rounded-full hover:bg-red-700 transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-gray-300 transition-colors font-medium">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
