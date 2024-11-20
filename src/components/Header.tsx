import { useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/users':
        return 'Users';
      case '/products':
        return 'Products';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <span className="text-sm font-medium">Admin User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;