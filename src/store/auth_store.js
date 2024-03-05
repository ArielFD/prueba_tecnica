import { create } from "zustand";

const useAuthStore = create((set) => ({
  jwt: null,
  userName:"",
  setJWT: (newJWT) => set({ jwt: newJWT }),
  setUser: (user) => set({ userName: user })
}));

export default useAuthStore;
