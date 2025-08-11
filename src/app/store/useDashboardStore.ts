import { create } from 'zustand';
import { Option } from '@/app/types/ui/dropdown.type';

interface DashboardState {
  selectedAttribute: Option;
  setSelectedAttribute: (option: Option) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedAttribute: { label: "All", value: "" },
  setSelectedAttribute: (option) => set({ selectedAttribute: option }),
}));
