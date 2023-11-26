import { create } from 'zustand';

type User = {
    id: string;
    city: string;
    lat: string;
    lon: string;
};

type SocketStore = {
    users: User[];
    setUsers: (users: User[]) => void;
};
export const useSocketStore = create<SocketStore>()((set, get) => {
    const setUsers = (users: User[]) => set({ users });

    return { users: [], setUsers };
});
