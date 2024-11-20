import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Users, DollarSign, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ icon: Icon, title, value, trend }: { icon: any; title: string; value: string; trend: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className="text-sm text-green-500 mt-1">{trend}</p>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        <Icon className="text-blue-500" size={24} />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { activeUsers, totalRevenue, salesData, sidebarOpen } = useSelector((state: RootState) => state.dashboard);

  return (
    <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Active Users"
            value={activeUsers.toLocaleString()}
            trend="+12.5% from last month"
          />
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            trend="+8.2% from last month"
          />
          <StatCard
            icon={TrendingUp}
            title="Conversion Rate"
            value="3.24%"
            trend="+2.1% from last month"
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#93c5fd" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;