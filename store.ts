import { create } from 'zustand';

const useStore = create((set) => ({
    param:'',
    info:{},
    setParam: (inpu :any) => set({ param : inpu}),
    setInfo: (item :any) => set({info : item})
}));

export default useStore;