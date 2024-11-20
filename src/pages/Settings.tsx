import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Save } from 'lucide-react';

const Settings = () => {
  const sidebarOpen = useSelector((state: RootState) => state.dashboard.sidebarOpen);

  return (
    <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotif"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="emailNotif" className="ml-2 text-gray-700">
                    Email Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pushNotif"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="pushNotif" className="ml-2 text-gray-700">
                    Push Notifications
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Theme Preferences</h3>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">Dark</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg">Light</button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                <Save size={20} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;