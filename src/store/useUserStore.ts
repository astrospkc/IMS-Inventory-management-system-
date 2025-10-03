
import { create } from "zustand";


interface UserStore {
  isAuthenticate: boolean;
  setIsAuthenticate: (isAuthenticate: boolean) => void;
  loading?: boolean;

  error?: string | null;
}
// user store
const useUserStore = create<UserStore>((set) => ({
  isAuthenticate: false,
  setIsAuthenticate: (isAuthenticate: boolean) =>
    set({ isAuthenticate: isAuthenticate }),

}));

export default useUserStore;
