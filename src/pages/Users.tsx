import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Loader2, UserPlus, Pencil, Trash2 } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import api from '../services/api';
import UserModal from './helperForms/UserModal';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: string;
  status?: 'Active' | 'Inactive';
}

const Users = () => {
  const sidebarOpen = useSelector((state: RootState) => state.dashboard.sidebarOpen);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // List all users
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setModalMode('add');
  };

  const handleAddClick = () => {
    setModalMode('add');
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (user: User) => {
    setModalMode('edit');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUserSubmit = async (formData: UserFormData) => {
    try {
      setIsLoading(true);
      if (modalMode === 'add') {
        await api.post("/users/register", formData);
        toast.success('User added successfully!');
      } else if (selectedUser?._id) {
        await api.patch(`/users/${selectedUser._id}`, formData);
        toast.success('User updated successfully!');
      }
      handleModalClose();
      await fetchUsers();
    } catch (error) {
      toast.error(modalMode === 'add' ? 'Failed to create user' : 'Failed to update user');
      console.error("Error handling user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      setIsLoading(true);
      await api.delete(`/users/${userId}`);
      toast.success('User deleted successfully!');
      await fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
      <Toaster position="top-right" />
      <div className="p-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">User Management</h2>
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            <UserPlus size={20} />
            Add User
          </button>
        </div>

        <UserModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleUserSubmit}
          initialData={selectedUser || undefined}
          isLoading={isLoading}
          mode={modalMode}
        />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="min-w-full divide-y divide-gray-200">
            {isLoading && !users.length ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 size={24} className="animate-spin text-blue-500" />
                <span className="ml-2">Loading users...</span>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-full transition-colors"
                            title="Edit user"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user._id)}
                            className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-colors"
                            title="Delete user"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Users;