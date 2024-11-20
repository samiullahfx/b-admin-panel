import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
  sidebarOpen: boolean;
  activeUsers: number;
  totalRevenue: number;
  salesData: Array<{ name: string; sales: number }>;
}

const initialState: DashboardState = {
  sidebarOpen: true,
  activeUsers: 2451,
  totalRevenue: 54232,
  salesData: [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 },
  ],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    updateActiveUsers: (state, action: PayloadAction<number>) => {
      state.activeUsers = action.payload;
    },
    updateRevenue: (state, action: PayloadAction<number>) => {
      state.totalRevenue = action.payload;
    },
  },
});

export const { toggleSidebar, updateActiveUsers, updateRevenue } = dashboardSlice.actions;
export default dashboardSlice.reducer;