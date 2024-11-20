import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, Settings, ChevronLeft, LogOut } from 'lucide-react';
import { RootState } from '../store/store';
import { toggleSidebar } from '../store/dashboardSlice';
import { authService } from '../services/auth.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = useSelector((state: RootState) => state.dashboard.sidebarOpen);
  const isAuthenticated = authService.isAuthenticated();
  const isLoginPage = location.pathname === '/login'; 

  if (isLoginPage) {
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Users', path: '/users' },
    // { icon: ShoppingCart, label: 'Products', path: '/products' },
    // { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    authService.logout();
    toast.success('Logged out successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'bg-green-50',
      bodyClassName: 'text-green-800',
      progressClassName: 'bg-green-300',
    });
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <div
        className={`bg-gray-900 text-white h-screen fixed left-0 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className={`font-bold text-xl ${!isOpen && "hidden"}`}>
            Admin Panel
          </h1>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 hover:bg-gray-800 rounded-lg"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <ChevronLeft
              className={`transform transition-transform ${
                !isOpen && "rotate-180"
              }`}
            />
          </button>
        </div>
        <nav className="flex flex-col h-[calc(100%-5rem)] justify-between p-4">
          <div>
            {menuItems.map((item) => (
              <div
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-4 p-3 hover:bg-gray-800 rounded-lg cursor-pointer mb-2 ${
                  location.pathname === item.path ? "bg-gray-800" : ""
                }`}
              >
                <item.icon size={20} />
                <span className={!isOpen ? "hidden" : ""}>{item.label}</span>
              </div>
            ))}
          </div>
          {isAuthenticated && (
            <div
              onClick={handleLogout}
              className="flex items-center gap-4 p-3 hover:bg-red-600 rounded-lg cursor-pointer mt-auto text-red-400 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              <span className={!isOpen ? "hidden" : ""}>Logout</span>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;