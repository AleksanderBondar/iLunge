import { create } from 'zustand';

type User = {
    id: string;
    city: string;
    lat: string;
    lon: string;
};

type SocketStore = {
    isConnected: boolean;
    setConnected: (isConnected: boolean) => void;
    users: User[];
    setUsers: (users: User[]) => void;
};
export const useSocketStore = create<SocketStore>()((set, get) => {
    const setConnected = (isConnected: boolean) => set({ isConnected });
    const setUsers = (users: User[]) => set({ users });

    return {
        isConnected: false,
        setConnected,
        users: [],
        setUsers,
    };
});
