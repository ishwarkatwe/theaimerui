import { create } from "zustand";
import type { Item } from "../interface/Items";

const useStore = create((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
  notes: [],
  setNotes: (notes: Item[]) => set({ notes }),
  user: null,
  setUser: (user: any) => set({ user }),
}));

export default useStore;
