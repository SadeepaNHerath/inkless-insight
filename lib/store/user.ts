import { create } from "zustand";
import { Iuser } from "../types";

interface UserState {
	user: Iuser | null;
	setUser: (user: Iuser | null) => void;
}

export const useUser = create<UserState>()((set: (arg0: () => { user: Iuser; }) => any) => ({
	user: null,
	setUser: (user: Iuser | null) => set(() => ({ user })),
}));