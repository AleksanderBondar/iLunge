import { create } from 'zustand';

type MoveMap = 'station' | undefined;

type MapStore = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;

    moveMap: MoveMap;
    goTo: (where: MoveMap) => Promise<void>;
};
export const useMapStore = create<MapStore>()((set, get) => {
    const open = () => set({ isOpen: true });
    const close = () => set({ isOpen: false });
    const toggle = () => set(state => ({ isOpen: !state.isOpen }));

    const goTo = async (where: MoveMap) => {
        set({ moveMap: where });
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ moveMap: undefined });
    };

    return {
        isOpen: false,
        moveMap: undefined,
        open,
        close,
        toggle,
        goTo,
    };
});
